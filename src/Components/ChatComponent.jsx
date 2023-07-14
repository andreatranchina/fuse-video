import React, { useState } from 'react';
import 'react-chat-elements/dist/main.css'
import { ChatItem, MessageBox, Input } from 'react-chat-elements'
/* import '../Images/chat-avatar.png' */

export const ChatBox = () => {
    
    // Message storage
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([

    ]);

    const handleInput = () => {

        const newMessage = {
            position: 'right',
            type: 'text',
            text: inputMessage,
            date: new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
            }),
        };
        
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage('');
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
                value={inputMessage}
                onChange={(event) => handleInput(event.target.value)}
                rightButtons={<button onClick={handleSendMessage}>Send</button>}
            />
        </div>
    )
}
