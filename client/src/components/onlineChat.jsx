import React from  'react';
import './onlineChat.scss';

export default function OnlineChat() {
  
  return (
    <div class="chat-popup" id="myForm">
      <form action="/" class="form-container">
        <h3>Chat with Expert</h3>
        <section>

        <textarea placeholder="Type message.." name="msg" required></textarea>
        </section>

        <button type="submit" class="btn">Send</button>
        <button type="button" class="btn cancel" >Close</button>

      </form>
    </div>  
  )
};