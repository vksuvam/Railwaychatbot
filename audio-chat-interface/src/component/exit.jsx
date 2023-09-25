import React from 'react';
import './exitt.css'; // Import the CSS styles

const Exit = ({ onExitClick }) => {
  return (
    <div className="exit-button-container">
      <button className="exit-button" onClick={onExitClick}>
        Exit
      </button>
    </div>
  );
};

export default Exit;
