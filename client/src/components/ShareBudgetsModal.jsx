import React, {useRef, useState} from 'react';
import Popup from 'reactjs-popup';
import '../styles/NewCategory.scss';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

export default function ShareBudget(props) {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState('')

  function saveTemplate(inputMessage, inputEmail, currentBudget) {
    const userId = parseInt(sessionStorage.token);
    // needs to be handed the budget id and the reciever email 
 
    const url = "http://localhost:3002/api/messages/send";
    return axios
    .put(url, {userId, budgetId: currentBudget, message: inputMessage, recieverMail: inputEmail})
    .then(() => console.log("test front end"));
    }
    console.log('this is props', props)
    console.log('this is message', message)
    console.log('this is email', email)
  
  return(
  <Popup
    trigger={<button>SHARE</button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Share budget with a friend </div>
        <div className="category-form-container">
          {' '}
          <form class="new-category-form" onSubmit={() => saveTemplate(message, email, props.budgetId)}>
            <label>Message</label>
            <input placeholder='please enter message' type='text' value={message} onChange={event => setMessage(event.target.value)}/>
            <label>Email</label>
            <input placeholder='please enter email' type='text' value={email} onChange={event => setEmail(event.target.value)}/>
            <br></br>
            <button type="submit" className="new-category-button">Submit</button>
          </form>
        </div>
      </div>
    )}
  </Popup>
  );
};