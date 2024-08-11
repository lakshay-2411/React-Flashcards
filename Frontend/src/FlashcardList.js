import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
require("dotenv").config();
import './FlashcardList.css';

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const fetchFlashcards = () => {
    fetch(`${process.env.BACKEND_URL}/api/flashcards`)
      .then(response => response.json())
      .then(data => setFlashcards(data));
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const handleNext = () => {
    if (flashcards.length > 0) {
      if(flipped) setFlipped(false);
      setCurrentIndex((currentIndex + 1) % flashcards.length);
    }
  };

  const handlePrev = () => {
    if (flashcards.length > 0) {
      if(flipped) setFlipped(false);
      setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
    }
  };

  if (flashcards.length === 0) return <div>Loading...</div>;

  return (
    <div className="flashcard-container">
      <Flashcard front={flashcards[currentIndex]?.front} back={flashcards[currentIndex]?.back} flipped={flipped} handleFlashCardClick={()=>setFlipped(prev => !prev)}/>
      <div className="navigation-buttons">
        <button onClick={handlePrev} className="prev-button"><img src='/prev.png'></img></button>
        <button onClick={handleNext} className="next-button"><img src='/next.png'></img></button>
      </div>
    </div>
  );
}

export default FlashcardList;
