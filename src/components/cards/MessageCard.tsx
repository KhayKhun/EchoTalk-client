import React from 'react'
import { MessageType } from '@/src/config/app.types'
import User from '../../../public/user.png'
import User2 from '../../../public/user-2.png'

const MessageCard = ({username, message, time,newMessage}: MessageType & {newMessage ?: boolean}) => {
  return (
    <li className={`message-card ${newMessage && 'newMessage'}`} >
      {!(username === 'server') && <img src={username === 'You' ? User.src : User2.src} className='chat-pf h-[32px] md:h-[50px]'/>}
        <div>
            <span className='message-username'>{username === 'server' ? '' : username}</span>
            <span className='message-time'>{time}</span>
            <p className='message-text'>{message}</p>
        </div>
    </li>
  )
}

export default MessageCard;