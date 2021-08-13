import React, { cloneElement } from 'react';
import Popup from 'reactjs-popup';
import '../styles/NewCategory.scss';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function NewCategory(props) {
  const name = React.useRef(null);
  const spending_limit = React.useRef(null);

  const handleSubmit = (ele) => {
    ele.preventDefault();
    const category = {
      name: name.current.value,
      budget_id: props.budget_id,
      spending_limit: parseInt(spending_limit.current.value)
    }

    props.onSave(category);
  }
  
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
        <div className="header"> Create New Categories: </div>
        <div className="category-form-container">
          {' '}
          <form class="new-category-form" onSubmit={handleSubmit}>
            <input type="text" ref={name} placeholder="  Name" className="modalInput"></input>
            <br></br>
            <input type="text" ref={spending_limit} placeholder="  Spending Limit" className="modalInput"></input>
            <br></br>
            <button type="submit" className="new-category-button">Submit</button>
            <br></br>
            <button className="new-category-button" onClick={close}>Done</button>
          </form>
        </div>
      </div>
    )}
  </Popup>
  );
};