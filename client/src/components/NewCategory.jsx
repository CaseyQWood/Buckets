import React from 'react';
import Popup from 'reactjs-popup';
import '../styles/NewCategory.scss';

export default function NewCategory(props) {
  return(
  <Popup
    trigger={<button className="button"> Open Modal </button>}
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
          <form class="new-category-form">
            <label>Name:</label>
            <input type="text"></input>
            <label>Spending Limit:</label>
            <input type="text"></input>
            <label>Current Budget:</label>
            <input type="text" step="1" placeholder={props.budget_id}></input>
          </form>
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
  );
};