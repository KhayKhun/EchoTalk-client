'use client'
import io,{Socket} from 'socket.io-client'
import { SOCKET_URL } from '../config/default'
import { createContext, useContext, useEffect, useState } from 'react'
import EVENTS from '../config/events'
import { MessageType } from '../config/app.types'

type RoomDetail = {
    [roomId: string]: {
        name : string,
        owner : string
    }
}

type Context = {
    socket : Socket,
    username ?: string,
    setUsername : Function,
    roomId ?: string,
    rooms : RoomDetail,
    messages :MessageType[],
    setMessages : Function,
    roomName ?: string,
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
    socket ,
    setUsername : () => false,
    rooms : {},
    setMessages : () => false,
    messages : [],
});

function SocketProvider(props :any){

    const [username,setUsername] = useState()
    const [roomId,setRoomId] = useState("")
    const [roomName,setRoomName] = useState("")
    const [rooms,setRooms] = useState({})
    const [messages,setMessages] = useState<MessageType[]>([])

    useEffect(()=>{
        window.onfocus = ()=>{
            document.title = "Chat App"
        }
    },[]);

    socket.on(EVENTS.SERVER.ROOMS, (value)=>{
        setRooms(value)
    })

    socket.on(EVENTS.SERVER.JOINED_ROOM, ({roomId,roomName})=>{
        console.log(roomName)
        setRoomId(roomId)
        setRoomName(roomName)
    })

    socket.on(EVENTS.SERVER.SEND_ROOM_MESSAGE, (({message , username, time,roomId}) => {

        if(!document.hasFocus()){
            document.title = 'New message'
        }

        setMessages([
            ...messages,
            {
                username,
                message,
                time,
                roomId
            }
        ])
    }))

    socket.on(EVENTS.SERVER.JOIN_ROOM, ({joinRoomId , roomName}) => {
        setRoomId(joinRoomId)
        setRoomName(roomName)
    })

    socket.on(EVENTS.SERVER.FRESHER , ({rooms}) => {
        setRooms(rooms)
    })

    return <SocketContext.Provider 
    value={{socket , username, setUsername, rooms, roomId,roomName, messages, setMessages}}
    {...props}/>
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
