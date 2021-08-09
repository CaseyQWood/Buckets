import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import '../styles/NewCategory.scss';
import { Button } from '@material-ui/core';

export default function NewExpense(props) {
  const name = React.useRef(null);
  const amount_to_goal = React.useRef(null);
  const amount_added = React.useRef(null);
  
  const getCurrentDay = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const dateString = `${year}-${month}-${day}`;
    return dateString;
  }



  const handleSubmit = (ele) => {
    const goal = {
      name: name.current.value,
      user_id: sessionStorage.token,
      budget_id: props.budgetId,
      amount_to_goal: amount_to_goal.current.value,
      amount_added: amount_added.current.value,
      start_date: getCurrentDay,
      end_date: getCurrentDay
    }

    props.onSave(goal);
  }

  return (
    <Popup
      trigger={<Button variant="contained" size="large">
        Create a New Goal
      </Button>}
      modal
      nested
    >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Create a New Goal: </div>
          <div className="category-form-container">
            {' '}
            <form class="new-category-form" onSubmit={handleSubmit}>
              <input type="text" ref={name} placeholder="   Name" className="modalInput"></input>
              <br></br>
              <input type="text" ref={amount_to_goal} placeholder="   Total Cost" className="modalInput"></input>
              <br></br>
              <input type="text" ref={amount_added} placeholder="   Contributions so far..." className="modalInput"></input>
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