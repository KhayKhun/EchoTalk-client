import React, { useEffect, useRef } from 'react'
import { useSocket } from '../context/socket.context'
import EVENTS from '../config/events'
import MessageCard from './cards/MessageCard'

const Message = () => {

  const {socket , roomId ,roomName, username, messages,setMessages} = useSocket()
  const textaraRef = useRef<any>(null)

  function handleSendMessage(){
    const message = textaraRef.current.value;
  
    if(!String(message).trim()) return;

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {message, username,roomId})

    const date = new Date();

    setMessages([
      ...messages,{
        username : 'You',
        message,
        roomId,
        time : `${date.getHours()}:${date.getMinutes()}`
      }
    ])
    textaraRef.current.value = ''
  }

  useEffect(()=>{
    const parentElement = document.getElementById('list')
    const elements = document.querySelectorAll('.message-card');
    if (elements.length > 0 && parentElement) {
      console.log('scrolled')
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('newMessage')
      }
      const lastMessage = elements[elements.length - 1]
      console.log(lastMessage.textContent)
      const y = lastMessage.getBoundingClientRect().bottom + window.pageYOffset + 9999
      parentElement.scrollTo({ top: y, behavior: 'smooth' });
    }

  },[messages])

  return (
    <div className='message-container'>
      <h1 className='m-2'>{roomName ? roomName : 'Choose a server to chat' }</h1>
      <div className='w-full h-[2px] rounded-full bg-gray-600'/>
      <ul id='list'>
        {
        messages?.filter((message)=> message.roomId === roomId).map((message,index) =>{
          return <MessageCard key={index} username={message.username} time={message.time} message={message.message} />
        })
      }
      </ul>

      <footer>
        <input
        placeholder='Write a message...'
        ref={textaraRef}
        />
        <button onClick={handleSendMessage}>Send</button>
      </footer>
    </div>
  )
}

export default Message