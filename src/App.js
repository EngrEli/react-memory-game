import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';

const easyCards = [
  { text: 1, paired: false },
  { text: 2, paired: false },
];

const mediumCards = [
  { text: 1, paired: false },
  { text: 2, paired: false },
  { text: 3, paired: false },
  { text: 4, paired: false },
  { text: 5, paired: false },
  { text: 6, paired: false },
  { text: 7, paired: false },
  { text: 8, paired: false },
];

const hardCards = [
  { text: 1, paired: false },
  { text: 2, paired: false },
  { text: 3, paired: false },
  { text: 4, paired: false },
  { text: 5, paired: false },
  { text: 6, paired: false },
  { text: 7, paired: false },
  { text: 8, paired: false },
  { text: 9, paired: false },
  { text: 10, paired: false },
  { text: 11, paired: false },
  { text: 12, paired: false },
  { text: 13, paired: false },
  { text: 14, paired: false },
  { text: 15, paired: false },
  { text: 16, paired: false },
  { text: 17, paired: false },
  { text: 18, paired: false },
];

export default function App() {
  const [difficulty, setDifficulty] = useState('');
  const [isSeLectDifficulty, setIsSelectDifficulty] = useState(true);
  const [cards, setCards] = useState([]);
  const [selectedFirstCard, setSelectedFirstCard] = useState(null);
  const [selectedSecondCard, setSelectedSecondCard] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Check if all cards were paired already
  useEffect(() => {
    const allPaired = cards.every((item) => item.paired);
    if (!isSeLectDifficulty && allPaired) {
      setTimeout(() => {
        setIsGameOver(allPaired);
      }, 1000);
    }
  }, [cards]);

  useEffect(() => {
    // Check if there are two selected cards
    if (selectedFirstCard && selectedSecondCard) {
      // Check if the first card matches the selected second card
      if (selectedFirstCard.text === selectedSecondCard.text) {
        setCards((prevCards) => {
          return prevCards.map((item) => {
            if (item.text === selectedFirstCard.text) {
              return { ...item, paired: true };
            } else {
              return item;
            }
          });
        });
        resetSelection();
      } else {
        // The cards didn't match
        resetSelection();
      }
    }
  }, [selectedFirstCard, selectedSecondCard]);

  // Select difficulty
  const handleClickSelectDifficulty = (level) => (e) => {
    setDifficulty(level);
    setIsSelectDifficulty(false);
  };

  // Start game after choosing difficulty
  useEffect(() => {
    shuffleCards();
  }, [difficulty]);

  // Reset the state of selected cards
  const resetSelection = () => {
    // Cancel clicks by user
    setIsEvaluating(true);
    const timer = setTimeout(() => {
      setSelectedFirstCard(null);
      setSelectedSecondCard(null);
      setIsEvaluating(false);
    }, 1000);

    return () => clearTimeout(timer);
  };

  // Shuffle Cards based on the selected difficulty
  const shuffleCards = () => {
    let cards = null;
    if (difficulty === 'easy') {
      cards = easyCards;
    } else if (difficulty === 'medium') {
      cards = mediumCards;
    } else {
      cards = hardCards;
    }

    const shuffleCards = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
  };

  // Match class names based on difficulty
  const difficultyClassMap = {
    easy: 'card-grid-easy',
    medium: 'card-grid-medium',
    hard: 'card-grid-hard',
  };

  // Assign selected cards to state
  const handleSelectCard = (card) => (e) => {
    if (!selectedFirstCard) {
      setSelectedFirstCard(card);
    } else if (!selectedSecondCard) {
      setSelectedSecondCard(card);
    }
  };

  // Reset game, shuffle card and remove assigned selected states
  const resetGame = () => {
    shuffleCards();
    setSelectedFirstCard(null);
    setSelectedSecondCard(null);
  };

  // Go back to selecting difficulty
  const handlePlayAgain = () => {
    setIsGameOver(false);
    setIsSelectDifficulty(true);
    setDifficulty('');
  };

  return (
    <div className="memorygame">
      <h1>Memory Game</h1>
      <div
        style={{
          display: isGameOver ? 'none' : 'block',
        }}
      >
        <div
          style={{
            display: isSeLectDifficulty ? 'block' : 'none',
          }}
        >
          <div>Select Difficulty</div>
          <button
            className="memorygame-button memorygame-button__main"
            onClick={(e) => handleClickSelectDifficulty('easy')(e)}
          >
            Easy
          </button>
          <button
            className="memorygame-button memorygame-button__main"
            onClick={(e) => handleClickSelectDifficulty('medium')(e)}
          >
            Medium
          </button>
          <button
            className="memorygame-button memorygame-button__main"
            onClick={(e) => handleClickSelectDifficulty('hard')(e)}
          >
            Hard
          </button>
        </div>

        <div style={{ display: isSeLectDifficulty ? 'none' : 'block' }}>
          <div className={`card-grid ${difficultyClassMap[difficulty]}`}>
            {cards.map((item) => (
              <Card
                key={item.id}
                item={item}
                shown={
                  item === selectedFirstCard ||
                  item === selectedSecondCard ||
                  item.paired
                }
                isEvaluating={isEvaluating}
                handleSelectCard={handleSelectCard}
                selectedFirstCard={selectedFirstCard}
                selectedSecondCard={selectedSecondCard}
              />
            ))}
          </div>

          <button
            className="memorygame-button memorygame-button__secondary"
            onClick={resetGame}
            style={{ display: isSeLectDifficulty ? 'none' : 'inline' }}
          >
            Restart
          </button>
        </div>
      </div>

      <div style={{ display: isGameOver ? 'block' : 'none' }}>
        <button
          className="memorygame-button memorygame-button__main"
          onClick={handlePlayAgain}
        >
          Play again?
        </button>
      </div>
    </div>
  );
}
