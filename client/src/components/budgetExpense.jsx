import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function BudgetExpense(props) {
  const {name, cost, payee, amount_paid, onDelete} = props;

  return(
    <div className="budget-expense">
      <h2>{payee}</h2>
      <h2>{name}</h2>
      <h2>{amount_paid}</h2>
      <h2>{cost}</h2>
      <div className="budget-icons">
        <EditIcon />
        <DeleteIcon onClick={onDelete}/>
      </div>
    </div>
  )
}