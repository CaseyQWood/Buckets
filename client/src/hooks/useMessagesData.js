import { useState, useEffect } from "react";
import axios from "axios";

export default function useMessages(initial) {
  const [messageState, setMessageState] = useState([]);
  const userId = parseInt(sessionStorage.token);

  console.log(userId)

    useEffect(() => {
      axios.get(`http://localhost:3002/api/messages`)
      .then(res => {
      const messages = res.data;
      console.log('teeeest', messages)
      setMessageState(prev => (messages))
    });
    }, [])

  return { messageState }
};