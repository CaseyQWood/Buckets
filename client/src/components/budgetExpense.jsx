import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider } from '@material-ui/core';


export default function BudgetExpense(props) {
  const {name, cost, payee, amount_paid, onDelete} = props;

  return(
    <div className="budget-expense">
      <p>{payee}{name}{amount_paid}</p>
      <p>Amount paid:{cost}</p>
      <div className="budget-icons">
        <EditIcon />
        <DeleteIcon onClick={onDelete}/>
        <Divider/>
      </div>
    </div>
  )
}