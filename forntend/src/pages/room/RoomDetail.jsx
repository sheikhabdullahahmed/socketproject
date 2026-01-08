import React from 'react'
import { useParams } from 'react-router-dom'
import ChatBox from '../chat/ChatPage'

function RoomDetail() {
  const {roomId} = useParams();
  return (
    <div>
      <ChatBox roomId={roomId}/>

    </div>
  )
}

export default RoomDetail