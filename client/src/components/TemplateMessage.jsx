import React from 'react'
import axios from 'axios';

export default function SharedTemplate(props) {

  const save = (messageData) => {
    const url = 'http://localhost:3002/api/messages/save'
    const userId = sessionStorage.token

    return axios.put(url, {...messageData, ownerId: userId})
    .then(() => console.log('test front end'))
  }

  const details = props.message
  return (
    <li>{details.message} <button onClick={() => save(props)}>Accept</button></li>
  )
}