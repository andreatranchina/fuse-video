import React, { useState } from 'react';
import 'react-chat-elements/dist/main.css'
import { ChatItem, MessageBox, Input } from 'react-chat-elements'
/* import '../Images/chat-avatar.png' */

export const ChatBox = () => {
    
    // Message storage
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([

    ]);

    const handleInput = (value) => {
        setInput(value);
    }

    const handleSendMessage = () => {

        const newMessage = {
            position: 'right',
            type: 'text',
            text: input,
            date: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
            }),
        };
        
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');
    };


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
                value={input}
                onChange={(event) => handleInput(event.target.value)}
                rightButtons={<button onClick={handleSendMessage}>Send</button>}
            />
        </div>
    )
}
