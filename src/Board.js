// Board.js
import React, { useState, useEffect } from 'react';
import Card from './Card';
import '../src/Board.css';
import burger from '../src/Img/burger.png';
import cake from '../src/Img/cake.png';
import carrot from '../src/Img/carrot.png';
import coca from '../src/Img/coca cola.png';
import hotdog from '../src/Img/hot dog.png';
import icecream from '../src/Img/ice cream.png';
import cookie from '../src/Img/cookie.png';
import pasta from '../src/Img/pasta.webp';
import pizza from '../src/Img/pizza.png';
import potatoes from '../src/Img/potatoes.png';
import salad from '../src/Img/salad.png';
import taco from '../src/Img/taco.png';
import turkey from '../src/Img/turkey.png';
import noodle from '../src/Img/noodle.png';
import grapes from '../src/Img/grapes.png';
import donut from '../src/Img/donut.png';

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const valuesWithImages = [
  { value: 'burger', image: burger },
  { value: 'cake', image: cake },
  { value: 'carrot', image: carrot },
  { value: 'coca', image: coca },
  { value: 'hotdog', image: hotdog },
  { value: 'icecream', image: icecream },
  { value: 'cookie', image: cookie},
  { value: 'pasta', image: pasta },
  { value: 'pizza', image: pizza },
  { value: 'potatoes', image: potatoes },
  { value: 'salad', image: salad },
  { value: 'taco', image: taco },
  { value: 'turkey', image: turkey },
  { value: 'noodle', image: noodle },
  { value: 'grapes', image: grapes },
  { value: 'donut', image: donut },

];


const generateInitialDeck = () => {
  const initialDeck = [];
  for (let suit of suits) {
    for (let { value, image } of valuesWithImages) {
      initialDeck.push({ suit, value, image });
    }
  }
  return initialDeck;
};


const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const createBoard = (shuffledDeck) => {
  const duplicatedDeck = [...shuffledDeck, ...shuffledDeck];
  const shuffledBoard = shuffleDeck(duplicatedDeck);
  return shuffledBoard.map((card, index) => ({
    id: index,
    ...card,
    isFlipped: false,
    isMatched: false,
  }));
};

const Board = () => {
  const [board, setBoard] = useState(createBoard(generateInitialDeck()));
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    if (flippedCount === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.value === secondCard.value) {
        setBoard((prevBoard) =>
          prevBoard.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card
          )
        );
      }

      setTimeout(() => {
        setBoard((prevBoard) =>
          prevBoard.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setFlippedCount(0);
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCount, flippedCards]);

  const handleCardClick = (id, value) => {
    setBoard((prevBoard) =>
      prevBoard.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCount((prevCount) => prevCount + 1);
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, { id, value }]);
  };

  return (
    <div className="board-horizontal">
      {board.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          value={card.value}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onCardClick={handleCardClick}
          image={card.image} // Pasa la imagen al componente Card
        />
      ))}
    </div>
  );
};

export default Board;