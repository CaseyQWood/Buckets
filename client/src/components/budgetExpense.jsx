import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function BudgetExpense(props) {
  const {name, cost} = props;

  return(
    <div class="budget-expense">
      <h2>{name}</h2>
      <h2>{cost}</h2>
      <div class="budget-icons">
        <EditIcon />
        <DeleteIcon />
      </div>
    </div>
  )
}