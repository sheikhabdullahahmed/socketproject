import React from 'react'
import { useEffect, useState } from 'react'
import { data } from 'react-router-dom'
import { Socket } from 'socket.io-client'

interface Message {
    sender: string,
}
interface Props {
    roomId: string,
    userId:string, 
    socket: Socket,
}

const ChatBox = ({roomId, socket, userId}: Props) => {
    const  [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if(!socket) return;


        // listen for incoming messages
        socket.on("receive-message", (data: Message) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("receive-message")
        };
    },[socket])



  return (
    <div>
        <div>
            {messages.map((msg, index) => (
                <div key={index}>
                    <span>{msg.sender === userId ? "You" : msg.sender}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChatBox