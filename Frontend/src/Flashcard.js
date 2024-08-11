import React, { useState } from 'react';
import './Flashcard.css';

function Flashcard({ front, back, flipped, handleFlashCardClick }) {
    //const [flipped, setFlipped] = useState(false);
    const flashCardClickHandler = () => {
      handleFlashCardClick()
    }
  
    return (
      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={flashCardClickHandler}>
        <div className="front">
          <h3>{front}</h3>
        </div>
        <div className="back">
          <p>{back}</p>
        </div>
      </div>
    );
  }
  
  export default Flashcard;