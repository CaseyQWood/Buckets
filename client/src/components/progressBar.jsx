import React from 'react';
import './progressBar.scss';

export default function ProgressBar(props) {
  const { currentValue } = props;
  let backgroundColor;

  if (currentValue < 75) {
    backgroundColor = 'rgb(54, 162, 235)'
  } else { 
    backgroundColor = 'rgb(255, 99, 132)'
  };
  
  const fillerStyles = {
    height: '100%',
    width: `${currentValue}%`,
    'background-color': `${backgroundColor}`,
    'border-radius': 'inherit',
    'text-align': 'center'
  }
  
  return (
    <div class="progress-container">
      <div class="progress-filler" style={fillerStyles}>
        <span class="progress-label">{`${currentValue}%`}</span>
      </div>
    </div>
  );
};