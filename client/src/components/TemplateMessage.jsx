import React, {useState} from 'react'
import axios from 'axios';

export default function SharedTemplate(props) {
  const [show, setShow] = useState(true)

  const save = (messageData) => {
    const url = 'http://localhost:3002/api/messages/save'
    const userId = sessionStorage.token

    // if this is broken try returning the axios request
    axios.put(url, {...messageData, ownerId: userId})
    setShow(false)
  }

  const details = props.message
  return (
    <>
    {show ? <li>{details.message} <button onClick={() => save(props)}>Accept</button></li> : <div></div>}
    </>
  )
}