import React, { useState } from 'react';
import 'react-chat-elements/dist/main.css'
import { ChatItem, MessageBox, Input } from 'react-chat-elements'
/* import '../Images/chat-avatar.png' */

export const ChatBox = () => {
    
    // Message storage
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([

    ]);

    /* const handleInput = () => {
        
    } */

    return (
        <div>
            <ChatItem
                /* avatar="chat-avatar.png" */
                alt="Chat"
                title="Meeting Chat"
            />

            {messages.map((message, index) => (
                <MessageBox {...message} key={index} />
            ))}

            <Input
                placeholder="Send a message"
                value={inputMessage}
                onChange={(event) => setInput(event.target.value)}
                rightButtons={<button onClick={handleSendMessage}>Send</button>}
            />
        </div>
    )
}
