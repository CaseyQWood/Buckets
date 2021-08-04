import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function BudgetExpense(props) {
  const {name, cost} = props;

  return(
    <div className="budget-expense">
      <h2>{name}</h2>
      <h2>{cost}</h2>
      <div className="budget-icons">
        <EditIcon />
        <DeleteIcon />
      </div>
    </div>
  )
}