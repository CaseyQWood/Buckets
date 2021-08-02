import React, { Component } from 'react';
import "../styles/chatButton.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/fontawesome-free-solid'


export default function ChatButton(props) {
  
  return (
    <>
    <button class="chatButton" onClick={props.openChat}>
      Talk to the expert! <FontAwesomeIcon icon={faCoffee} />
    </button><i class="fa-solid fa-face-tongue-money"></i>
    </>
  )
}