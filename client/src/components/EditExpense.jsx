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
    ele.preventDefault();

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
    <Popup
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
              <label>Name:</label>
              <input type="text" ref={name}></input>
              <label>Cost:</label>
              <input type="text" ref={cost}></input>
              <label>Payee:</label>
              <input type="text" ref={payee}></input>
              <label>Amount paid so far:</label>
              <input type="text" ref={amount_paid}></input>
              <br></br>
              <button className="new-category-button" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
};