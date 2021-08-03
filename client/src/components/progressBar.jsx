import React from 'react';
import '../styles/progressBar.scss';

export default function ProgressBar(props) {
  const { currentValue, name, spendLimit } = props;


  let backgroundColor;
  // Set's color for the graph will be changed to final color scheme closer too
  if (currentValue < 75) {
    backgroundColor = 'rgb(54, 162, 235)'
  } else { 
    backgroundColor = 'rgb(255, 99, 132)'
  };
  // Necessary inline styles * DON'T TOUCH *
  const fillerStyles = {
    height: '100%',
    width: `${currentValue}%`,
    'backgroundColor': `${backgroundColor}`,
    'borderRadius': 'inherit',
    'textAlign': 'center'
  }
  // Progress bar structure
  return (
    <div className="category-progress-bar">
      <h3 className="category-margin">{name}</h3>
      <div className="progress-container">
        <div className="progress-filler" style={fillerStyles}>
          <span className="progress-label">{`${currentValue}%`}</span>
        </div>
      </div>
      <h3>{spendLimit}</h3>
    </div>
  );
};