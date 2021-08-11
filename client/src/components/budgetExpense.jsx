import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider, ListItem, ListItemText } from '@material-ui/core';
import EditExpense from '../components/EditExpense'



export default function BudgetExpense(props) {
  const {name, cost, payee, amount_paid, onDelete, onEdit, categoryId} = props;



  return(
    
    <div className="budget-expense">

      <p>{payee}</p>
      <p>{name}</p>
      <p>
      {/*amount_paid*/}
      <div className="budget-icons">
      {amount_paid}
        <div className="iconsss">
          <EditExpense onEdit={onEdit} categoryId={categoryId}/>
          <DeleteIcon onClick={onDelete}/>
        </div>
      </div>
      </p>  
      <Divider/>
    </div>
  )
}