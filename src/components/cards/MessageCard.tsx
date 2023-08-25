import React from 'react'
import { MessageType } from '@/src/config/app.types'
import Luffy from '../../../public/luffy.jpeg'

const MessageCard = ({username, message, time,newMessage}: MessageType & {newMessage ?: boolean}) => {
  return (
    <li className={`message-card ${newMessage && 'newMessage'}`} >
      <img src={Luffy.src} className='chat-pf'/>
        <div>
            <span className='message-username'>{username}</span>
            <span className='message-time'>{time}</span>
            <p className='message-text'>{message}</p>
        </div>
    </li>
  )
}

export default MessageCard;