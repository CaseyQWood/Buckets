import React from 'react';
import './progressBar.scss';
import useCategoryData from '../hooks/useCategoryData';

export default function CategoriesProgressBar(props) {
  const { currentValue } = props;
  const { state } = useCategoryData();
  console.log('State in Progress: ', state.values)
  
  let backgroundColor;

  if (currentValue < 75) {
    backgroundColor = 'rgb(54, 162, 235)'
  } else { 
    backgroundColor = 'rgb(255, 99, 132)'
  };

  //const categoryProgress = function(state) {
  //  for(const value of state.values) {
  //    return (
  //      
  //    )
  //  }
  //};
  
  const fillerStyles = {
    height: '100%',
    width: `${currentValue}%`,
    'backgroundColor': `${backgroundColor}`,
    'borderRadius': 'inherit',
    'textAlign': 'center'
  }
  
  return (
    <div className="progress-container">
      <div className="progress-filler" style={fillerStyles}>
        <span className="progress-label">{`${currentValue}%`}</span>
      </div>
    </div>
  );
};