'use client'
import { useSocket } from '@/src/context/socket.context'
import { useEffect, useRef, useState } from 'react'
import Message from '@/src/components/Message'
import Room from '@/src/components/Room'
import EVENTS from '@/src/config/events'
export default function Home() {
  const [socketId,setSocketId] = useState<string | undefined>(undefined)
  const {socket, username, setUsername} = useSocket()
  const usernameRef = useRef<any>(null)

  function handleUsername(){
    const value = usernameRef.current.value;
    if(!value) return;

    setUsername(value)
  }

  useEffect(()=>{
    setSocketId(socket?.id)
    console.log(socket.id)
  },[socket])

  useEffect(()=>{
    socket.emit(EVENTS.CLIENT.FRESHER,{})
    console.log("🚀 ~ file: page.tsx:26 ~ useEffect ~ emit:")
  },[])

  return (
    username ?
    
        <main className='container'>
          <div className="room"><Room/></div>
          <div className="message"><Message/></div>
        </main>

        :

        <main className='w-screen h-screen flex justify-center items-center'>
          <div className='w-[30vw] flex flex-col gap-2'>
            <h1 className='mb-3 text-lg'>Enter your name to continue</h1>
            <input type="text" ref={usernameRef} className='border p-3 rounded-lg h-[40px] outline-none text-gray-800 ' placeholder='eg. John Pettaly'/>
            <button onClick={handleUsername} className='bg-blue-600 p-3 rounded-lg text-sm h-[40px]'>Start</button>
          </div>
        </main>
    )
}