import React from 'react';
import '../styles/progressBar.scss';
import { Divider } from '@material-ui/core';

export default function ProgressBar(props) {
  const { currentValue, name, spendLimit } = props;

  const value = currentValue === undefined ? 0 : currentValue;
  
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
    maxWidth: '100%',
    'backgroundColor': `${backgroundColor}`,
    'borderRadius': 'inherit',
    'textAlign': 'center'
  }
  // Progress bar structure
  return (
    <div className="category-progress-bar">
      <h4 className="category-margin">{name}: {spendLimit}</h4>
      <div className="progress-container">
        <div className="progress-filler" style={fillerStyles}>
          <span className="progress-label">{`${value}%`}</span>
        </div>
      </div>
      <p>{spendLimit}</p>
    </div>
  );
};