import React from 'react';
import { useState, useEffect } from 'react';
import './Card.css';

export default function Card({ item, handleSelectCard, shown, isEvaluating }) {
  const [isVisible, setIsVisible] = useState(true);

  // Wait 1 sec before hiding the card that were paired recently
  useEffect(() => {
    if (item.paired) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [item.paired]);

  return (
    <div
      className="card"
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      <div
        className="card-inner"
        style={{
          opacity: shown ? '1' : '0',
          visibility: isVisible ? 'visible' : 'hidden',
          cursor: isEvaluating ? 'not-allowed' : 'pointer',
          pointerEvents: shown ? 'none' : 'auto',
        }}
        onClick={(e) => handleSelectCard(item)(e)}
      >
        {item.text}
      </div>
    </div>
  );
}
