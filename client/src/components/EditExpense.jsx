import React, { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import '../styles/NewCategory.scss';
import EditIcon from '@material-ui/icons/Edit';

export default function NewExpense(props) {
  const name = React.useRef(null);
  const cost = React.useRef(null);
  const payee = React.useRef(null);
  const amount_paid = React.useRef(null);

  const getCurrentDay = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const dateString = `${year}-${month}-${day}`;
    return dateString;
  }

  const handleSubmit = (ele) => {
      const expense = {
      name: name.current.value,
      cost: cost.current.value,
      category_id: props.categoryId,
      start_date: getCurrentDay(),
      end_date: getCurrentDay(),
      payee: payee.current.value,
      amount_paid: amount_paid.current.value,
      frequency: "Once",
      priority: 2
    }

    props.onEdit(expense);
  }

  return (
    <Popup open={false}
      trigger={
        <EditIcon />
      }
      modal
      nested
    >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Edit Expense: </div>
          <div className="category-form-container">
            {' '}
            <form class="new-category-form" onSubmit={handleSubmit}>
              <input type="text" ref={name} placeholder="   Name" className="modalInput"></input>
              <br></br>
              <input type="text" ref={cost} placeholder="   Cost" className="modalInput"></input>
              <br></br>
              <input type="text" ref={payee} placeholder="   Payee" className="modalInput"></input>
              <br></br>
              <input type="text" ref={amount_paid} placeholder="   Amount paid so far..." className="modalInput"></input>
              <br></br>
              <button className="new-category-button" type="submit">Submit</button>
              <br></br>
              <button className="new-category-button" onClick={close}>Done</button>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
};