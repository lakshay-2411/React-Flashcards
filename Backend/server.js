const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// API routes

// Get all flashcards
app.get('/api/flashcards', (req, res) => {
  const query = 'SELECT * FROM flashcards';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new flashcard
app.post('/api/flashcards', (req, res) => {
  const { front, back } = req.body;
  const query = 'INSERT INTO flashcards (front, back) VALUES (?, ?)';
  db.query(query, [front, back], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, front, back });
  });
});

// Update a flashcard
app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { front, back } = req.body;
  const query = 'UPDATE flashcards SET front = ?, back = ? WHERE id = ?';
  db.query(query, [front, back, id], (err) => {
    if (err) throw err;
    res.json({ id, front, back });
  });
});

// Delete a flashcard
app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flashcards WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
