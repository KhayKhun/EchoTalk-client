import React, { useRef } from 'react'
import { useSocket } from '../context/socket.context'
import EVENTS from '../config/events'
import Luffy from '../../public/luffy.jpeg'

const Room = () => {
    const {socket,roomId,rooms,username} = useSocket();
    const roomNameRef = useRef<any>(null)

    function handleCreateRoom(){
        console.log('Room creating')
        const roomName = roomNameRef.current.value || ''
        if(!String(roomName).trim()) return;

        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName , owner : username})
        roomNameRef.current.value = ''
    }

    function handleJoinRoom(joinRoomId : string){
        if(joinRoomId === roomId) return;
        console.log(joinRoomId,'called')
        socket.emit(EVENTS.CLIENT.JOIN_ROOM, {joinRoomId, roomName : rooms[joinRoomId].name})
    }



  return (
    <div className='w-full'>
        <div className='h-[30vh]'>
            <h6 className='label'>Create new server</h6>
            <div className='p-[2%] w-full'>
                <input className='h-[40px] outline-none bg-[#383A40] rounded-lg p-3 text-sm w-full' placeholder='Enter server Name' ref={roomNameRef} />
                <button onClick={handleCreateRoom} className='create-server-btn'>Create Server</button>
            </div>    
        </div>

        <div className='h-[60vh] overflow-y-scroll'>
            <h6 className='label'>Available servers</h6>
            <ul className='server-list'>
                {
                Object.keys(rooms).map((roomKey) => {
                    const eachRoomData = rooms[roomKey as keyof typeof rooms]
                    return <button key={roomKey} onClick={()=> handleJoinRoom(roomKey)}>
                        <div className='bg-gray-700 h-[1px] w-[90%] rounded-full'/>
                        <div className='flex items-center w-full gap-3 p-2'>
                            <img src={Luffy.src} className='chat-pf'/>
                            {eachRoomData.name}
                        </div>
                    </button>
                })
                }
            </ul>
        </div>
    </div>
  )
}

export default Room