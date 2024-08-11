import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel({ onUpdate }) {
  const [flashcards, setFlashcards] = useState([]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [editId, setEditId] = useState(null); // ID of the flashcard being edited

  // Fetch existing flashcards
  useEffect(() => {
    fetch('http://localhost:5000/api/flashcards')
      .then(response => response.json())
      .then(data => setFlashcards(data));
  }, []);

  // Add a new flashcard
  const handleAdd = () => {
    if (front.trim() === '' || back.trim() === '') {
      alert('Front and back values cannot be empty');
      return;
    }
    fetch('http://localhost:5000/api/flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ front, back }),
    })
    .then(response => response.json())
    .then(() => {
      setFront('');
      setBack('');
      // Fetch flashcards again after adding
      fetch('http://localhost:5000/api/flashcards')
        .then(response => response.json())
        .then(data => setFlashcards(data));
    });
  };

  // Delete a flashcard
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/flashcards/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      // Fetch flashcards again after deleting
      fetch('http://localhost:5000/api/flashcards')
        .then(response => response.json())
        .then(data => setFlashcards(data));
    });
  };

  // Set the current flashcard to edit
  const handleEditClick = (flashcard) => {
    setFront(flashcard.front);
    setBack(flashcard.back);
    setEditId(flashcard.id);
  };

  // Update a flashcard
  const handleUpdate = () => {
    if (front.trim() === '' || back.trim() === '') {
      alert('Front and back values cannot be empty');
      return;
    }
    fetch(`http://localhost:5000/api/flashcards/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ front, back }),
    })
    .then(response => response.json())
    .then(() => {
      setFront('');
      setBack('');
      setEditId(null);  // Reset the edit mode
      // Fetch flashcards again after updating
      fetch('http://localhost:5000/api/flashcards')
        .then(response => response.json())
        .then(data => setFlashcards(data));
    });
  };

  const formSubmitHandler = () => {
    if(editId) handleUpdate();
    else handleAdd();
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <form onSubmit={(e) => {e.preventDefault(); formSubmitHandler()}}>
      <input
        type="text"
        placeholder="Front"
        required
        value={front}
        onChange={(e) => setFront(e.target.value)}
      />
      <input
        type="text"
        placeholder="Back"
        required
        value={back}
        onChange={(e) => setBack(e.target.value)}
      />
      {editId ? (
        <button type='submit' >Update Flashcard</button>
      ) : (
        <button type='submit' >Add Flashcard</button>
      )}
      </form>
      
      <ul>
        {flashcards.map(flashcard => (
          <li key={flashcard.id}>
            {flashcard.front} - {flashcard.back}
            <button onClick={() => handleEditClick(flashcard)}><img className='editImage' src='/edit.png'></img></button>
            <button onClick={() => handleDelete(flashcard.id)}><img className='deleteImage' src='/delete.png'></img></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
