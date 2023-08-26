import React, { useRef, useState } from 'react'
import { useSocket } from '../context/socket.context'
import EVENTS from '../config/events'
import Group from '../../public/group.png'
import Plus from '../../public/plus.png'

const Room = () => {
    const {socket,roomId,rooms,username} = useSocket();
    const roomNameRef = useRef<any>(null)
    const [createRoom, setCreateRoom] = useState(false)

    function handleCreateRoom(){
        console.log('Room creating')
        const roomName = roomNameRef.current.value || ''
        if(!String(roomName).trim() || roomName.length > 15) {
            alert('Server name should be 1 to 20 characters')
            return
        };

        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName , owner : username})
        roomNameRef.current.value = ''
    }

    function handleJoinRoom(joinRoomId : string){
        console.log(joinRoomId)
        if(joinRoomId === roomId) return;
        console.log(joinRoomId,'called')
        socket.emit(EVENTS.CLIENT.JOIN_ROOM, {joinRoomId, roomName : rooms[joinRoomId].name})
    }

    function displayCreateRoom(){
        setCreateRoom((prev) => !prev)
    }

  return (
    <div className='w-full flex flex-col items-center'>
        <div className={`w-screen h-screen fixed bg-black bg-opacity-50 z-10 top-0 left-0 sm:hidden ${createRoom ? '' : 'hidden '}`}/>
        <div className={`h-[30vh] text-[10px] md:text-sm ${createRoom ? '' : 'hidden sm:block'} fixed top-1/2 sm:top-0 sm:left-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:translate-y-0 z-20 sm:relative`}>
            <h6 className='label'>Create new server</h6>
            <div className='p-[2%] w-full'>
                <input className='h-[40px] outline-none bg-[#383A40] rounded-lg p-3 text-sm w-full' placeholder='Enter server Name' ref={roomNameRef} />
                <button onClick={()=>{
                    handleCreateRoom()
                    displayCreateRoom()
                }} className='create-server-btn'>Create Server</button>
            </div>    
        </div>
        <button className='sm:hidden' onClick={displayCreateRoom}><img src={Plus.src} className='chat-pf p-3 bg-gray-800 mt-[10vh]'/></button>

        <div className='h-[60vh] overflow-y-scroll'>
            <h6 className='label md:inline hidden'>Available servers</h6>
            <ul className='server-list'>
                {
                Object.keys(rooms).map((roomKey) => {
                    const eachRoomData = rooms[roomKey as keyof typeof rooms]
                    return <button key={roomKey} onClick={()=> handleJoinRoom(roomKey)}>
                        <div className='bg-gray-700 h-[1px] w-[90%] rounded-full'/>
                        <div className='flex items-center w-full gap-3 p-2'>
                            <img src={Group.src} className='chat-pf p-2 rounded-lg'/>
                            <span className='hidden sm:inline text-sm md:text-base'>{eachRoomData.name}</span>
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