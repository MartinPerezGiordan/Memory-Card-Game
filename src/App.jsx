import { useEffect, useState } from "react";
import Card from "./Card";

import "./App.css";
const data = [
  { src: "../public/img/hippo.png", name: "Hippo", clicked: false },
  { src: "../public/img/crab.png", name: "Crab", clicked: false },
  { src: "../public/img/snake.png", name: "Snake", clicked: false },
  { src: "../public/img/Dog.png", name: "Dog", clicked: false },
  { src: "../public/img/duck.png", name: "Duck", clicked: false },
  { src: "../public/img/Flamenco.png", name: "Flamenco", clicked: false },
  { src: "../public/img/Lizard.png", name: "Lizard", clicked: false },
  { src: "../public/img/Shark.png", name: "Shark", clicked: false },
  { src: "../public/img/Squid.png", name: "Squid", clicked: false },
  { src: "../public/img/Rabbit.png", name: "Rabbit", clicked: false },
  { src: "../public/img/Gorilla.png", name: "Gorilla", clicked: false },
  { src: "../public/img/Pig.png", name: "Pig", clicked: false },
];

const shuffleArray = (array) => {
  const shuffledArray = [...array].sort(() => Math.random() - 0.5);
  return shuffledArray;
};

const App = () => {
  const [cards, setCards] = useState([]);
  const [turn, setTurns] = useState(0);
  const [loose, setLoose] = useState(false);

  const shuffleMount = () => {
    setCards(shuffleArray(data));
  };

  const shuffle = () => {
    setCards((prevCards) => shuffleArray(prevCards));
  };

  const handleClickRestart = () => {
    setCards(() => shuffleArray(data));
    setLoose(false);
    setTurns(0);
  };

  useEffect(() => {
    shuffleMount();
  }, []);

  const handleCardClick = (clickedCard) => {
    setTurns((prevTurn) => prevTurn + 1);
    setCards((prevCards) => {
      const newCards = prevCards.map((card) => {
        if (card.src === clickedCard.src) {
          if (card.clicked) {
            setLoose(true);
          }
          return { ...card, clicked: true };
        }
        return card;
      });
      shuffle(); // Shuffle after the player picks a card
      return newCards;
    });
  };

  return (
    <>
      <div className="App">
        <h1>Animals Memory Game</h1>
        <h2>SCORE: {turn}</h2>
        {loose ? (
          <div className="loose">
            <h1>YOU LOST</h1>
            <h2>Score: {turn}</h2>
            <button onClick={handleClickRestart}>New Game</button>
          </div>
        ) : (
          ""
        )}
        <div className="card-grid">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              handleCardClick={handleCardClick}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
