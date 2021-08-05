import axios from 'axios'
import React, { useEffect } from 'react'

export default function useAcceptTemplate(props) {

  useEffect(() => {
    const url = 'http://localhost:3002/api/messages/save'
    axios.put(url, {data: 'inset data here'}).then(() => console.log('test front end'))
  })
}