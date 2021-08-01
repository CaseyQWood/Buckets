import React from 'react';
import './progressBar.scss';
import useCategoryData from '../hooks/useCategoryData';

export default function CategoriesProgressBar(props) {
  const { currentValue } = props;
  const { state } = useCategoryData();
  console.log('********', state)
  let backgroundColor;

  if (currentValue < 75) {
    backgroundColor = 'rgb(54, 162, 235)'
  } else { 
    backgroundColor = 'rgb(255, 99, 132)'
  };
  
  const fillerStyles = {
    height: '100%',
    width: `${currentValue}%`,
    'backgroundColor': `${backgroundColor}`,
    'borderRadius': 'inherit',
    'textAlign': 'center'
  }
  
  return (
    <div class="progress-container">
      <div class="progress-filler" style={fillerStyles}>
        <span class="progress-label">{`${currentValue}%`}</span>
      </div>
    </div>
  );
};