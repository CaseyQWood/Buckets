//<div>Category Name prop</div>
//<div>Category Progress Bar component</div>
//<div>Amount</div>
//<div className="icons">Edit/Delete</div></div>
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import '../styles/progressBar.scss'

export default function BudgetCategory(props) {
  const {name, currentValue, spend_limit, onDelete} = props;
  
  let backgroundColor;

  if (currentValue < 75) {
    backgroundColor = 'rgb(54, 162, 235)'
  } else { 
    backgroundColor = 'rgb(255, 99, 132)'
  };
  
  const fillerStylesBudget = {
    height: '100%',
    width: `${currentValue}%`,
    'backgroundColor': `${backgroundColor}`,
    'borderRadius': 'inherit',
    'textAlign': 'center'
  }
  
  return(
    <div className="budget-div">
      <h2>{name}</h2>
      <div className="progress-bar-budget">
        <div className="category-progress-bar">
          <div className="progress-container">
            <div className="progress-filler" style={fillerStylesBudget}>
              <div className="progress-label">{`${currentValue}%`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-value-budget">
        <h2>{spend_limit}</h2>
      </div>
      <div className="category-icons">
        <EditIcon />
        <DeleteIcon onClick={onDelete}/>
      </div>
    </div>
  )
}