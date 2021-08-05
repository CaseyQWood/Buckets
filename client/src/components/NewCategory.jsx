import React, {useRef} from 'react';
import Popup from 'reactjs-popup';
import '../styles/NewCategory.scss';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

export default function NewCategory(props) {
  const name = React.useRef(null);
  const budget_id = React.useRef(null);
  const spending_limit = React.useRef(null);

  const handleSubmit = (ele) => {
    ele.preventDefault();

    const category = {
      name: name.current.value,
      budget_id: parseInt(budget_id.current.value),
      spending_limit: parseInt(spending_limit.current.value)
    }
    axios.post('http://localhost:3002/api/categories/', category)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(error => {
        console.log(error.message)
      });
  }
  
  console.log("NAME: ", name, "budget_id", budget_id, "spending_limit: ", spending_limit)
  return(
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
        <div className="header"> Create a New Category: </div>
        <div className="category-form-container">
          {' '}
          <form class="new-category-form" onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" ref={name}></input>
            <label>Spending Limit:</label>
            <input type="text" ref={spending_limit}></input>
            <label>Current Budget:</label>
            <input type="text" step="1" placeholder={props.budget_id} ref={budget_id}></input>
            <button type="submit">Submit:</button>
          </form>
        </div>
      </div>
    )}
  </Popup>
  );
};