import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import FlashcardList from './FlashcardList';
import AdminPanel from './AdminPanel';
import './App.css'

function Navigation() {
  const navigate = useNavigate();

  return (
    <header>
      <nav className='routes'>
        <button className='flashcard-route' onClick={() => navigate('/')}>Flashcards</button>
        <button className='admin-route' onClick={() => navigate('/admin')}>Admin</button>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<FlashcardList />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
