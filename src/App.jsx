import { useEffect, useState } from "react";
import Card from "./Card";
import jungleSound from "../public/audio/jungle.mp3";

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
  const [win, setWin] = useState(false);
  const [howto, sethowto] = useState(false);
  const [best, setBest] = useState(0);
  console.log(cards);

  const shuffleMount = () => {
    setCards(shuffleArray(data));
  };

  const shuffle = () => {
    setCards((prevCards) => shuffleArray(prevCards));
  };

  const handleClickRestart = () => {
    setCards(() => shuffleArray(data));
    setLoose(false);
    setWin(false);
    setTurns(0);
  };

  const handleClickHowto = () => {
    sethowto(!howto);
  };

  useEffect(() => {
    if (best < turn) {
      setBest(turn);
    }
  });

  useEffect(() => {
    shuffleMount();
  }, []);

  // Check for a win
  useEffect(() => {
    const everyCardIsClicked = cards.every((card) => card.clicked);

    if (everyCardIsClicked) {
      if (turn != 0) {
        setWin(true);
      }
    }
  }, [cards]);

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

      return newCards;
    });
    shuffle(); // Shuffle after the player picks a card
  };

  return (
    <>
      <div className="App">
        <div className="score-board">
          <h2>SCORE: {turn}</h2>
          <h3>Best Score: {best}</h3>
          <button onClick={handleClickHowto}>How to play</button>
          {howto ? (
            <div className="how-to">
              <p>
                In this game, your objective is to pick each card on the board
                without repeating any card. Click or tap on a card to get a
                point, then choose another card without selecting the same one
                again. Successfully pick each card on the board to win the game.
              </p>
              <button onClick={handleClickHowto}>Close</button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="game-board">
          <h1>Animals Memory Game</h1>
          {loose ? (
            <div className="loose">
              <h1>YOU LOST</h1>
              <h2>Score: {turn}</h2>
              <h3>Best Score: {best}</h3>
              <button onClick={handleClickRestart}>New Game</button>
            </div>
          ) : (
            ""
          )}
          {win ? (
            <div className="loose">
              <h1>YOU WIN</h1>
              <h2>Score: {turn}</h2>
              <h3>Best Score: {best}</h3>
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
      </div>
    </>
  );
};

export default App;
