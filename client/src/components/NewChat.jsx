import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import Messages from './Messages';
import InfoBar from "./InfoBar";
import Input from "./Input";
import "../styles/Chat.scss";

const ENDPOINT = 'http://localhost:3002';

// pass data into socket
let socket;

const NewChat = (props) => {
  const { userName, question } = props;
  // retrive user firstName and lastName from sessionStorage
  const firstName = sessionStorage.firstName;
  const lastName = sessionStorage.lastName;
  
  const [name, setName] = useState(`${firstName}, ${lastName}`);
  const [room, setRoom] = useState("BucketUp");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    
    // pass endpoint to server localhost:3002
    socket = io(ENDPOINT, { transports: ["websocket"]});

    setRoom(room);
    setName(name);

    // emit from client side socket with join even
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        // alert(error);
      }
    });
  }, [userName, question]);

  useEffect(() => {
    // wait message event from backend
    socket.on("message", (message) => {
      // setMessages to message sate
      setMessages(messages => [ ...messages, message ]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  const [chatVis, setChatVis] = useState(true);

  const switchChatMode = () => {
    if (chatVis === true) setChatVis(false);
    else setChatVis(true);
    console.log("chat vis!!!", chatVis);
  }
 

  // Testing messages record and message
  if (chatVis) {
    return (
      <div className="outerContainer">
        <div className="chat-container">
          <InfoBar room={room} switchChatMode={switchChatMode}/>
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
    );
  } else {
    return (
      <div></div>
    )
  } 
};

export default NewChat;
