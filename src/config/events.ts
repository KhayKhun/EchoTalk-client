const EVENTS = {
    connection : 'connection',
    CLIENT : {
        CREATE_ROOM : 'create_room',
        SEND_ROOM_MESSAGE : 'send_room_message',
        JOIN_ROOM : 'join_room',
        FRESHER : 'fresher'
    },
    SERVER : {
        ROOMS : 'rooms',
        JOINED_ROOM : 'joined_room',
        JOIN_ROOM : 'join_room',
        SEND_ROOM_MESSAGE : 'send_room_message',
        FRESHER : 'fresher'
    }
}


export default EVENTS;