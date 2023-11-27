// Card.js
import React from 'react';
import './Card.css';

const Card = ({ id, value, isFlipped, isMatched, onCardClick, image }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onCardClick(id, value);
    }
  };

  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-content">
        <div className={`card-suit ${isFlipped || isMatched ? 'visible' : ''}`}>
          {isFlipped || isMatched ? <img src={image} alt={value} className="card-image" /> : '?'}
        </div>
      </div>
    </div>
  );
};

export default Card;
