import React from 'react'
import useMessagesData from '../hooks/useMessagesData'
import SharedTemplate from '../components/TemplateMessage'
import '../styles/inbox.scss'

export default function Messages(props) {
  const {messageState} = useMessagesData()

  console.log('--------', messageState)
  return (
    <div className='capitan'>
      <div className='inbox'> 
      <h3>Your current messages</h3>
        <div className='inbox--tupperware'>
          <ul>
            {messageState.map(message => <SharedTemplate message={message}/>)}
            
            
          </ul>
        </div>
      </div>
    </div>
  )
}