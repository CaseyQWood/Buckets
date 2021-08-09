import React, { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import '../styles/NewCategory.scss';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function NewExpense(props) {
  const name = React.useRef(null);
  const cost = React.useRef(null);
  const payee = React.useRef(null);
  const amount_paid = React.useRef(null);

  const [open, setOpen] = useState(true);
  
  const handleClose = () => {
    setOpen(false);
  }

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
      category_id: props.category_id,
      start_date: getCurrentDay(),
      end_date: getCurrentDay(),
      payee: payee.current.value,
      amount_paid: amount_paid.current.value,
      frequency: "Once",
      priority: 2
    }

    props.onSave(expense);
    handleClose();
  }

  return (
    <Popup
      trigger={<button className="button">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </button>}
      modal
      nested
    >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Create a New Expense: </div>
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
              <br></br>
              <button className="new-category-button" onClick={close}>Done</button>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
};