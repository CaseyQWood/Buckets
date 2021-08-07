import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import '../styles/NewCategory.scss';
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
    }
  
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