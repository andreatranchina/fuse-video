import React, { useState } from 'react';
import 'react-chat-elements/dist/main.css'
import { ChatItem, MessageBox, Input } from 'react-chat-elements'
/* import '../Images/chat-avatar.png' */

export const ChatBox = () => {
    
    // Message storage
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([

    ]);

    

    return (
        <div>
            <ChatItem
                avatar="chat-avatar.png"
                alt="Chat"
                title="Meeting Chat"
            />

            <MessageBox
                position="left"
                type="text"
                text="Hello, how can I help you?"
                dateString="10:00 AM"
            />

            <MessageBox
                position={"left"}
                type={"photo"}
                title={"Kursat"}
                data={{
                    uri: "https://picsum.photos/200/200",
                }}
            />

            <MessageBox
                position="right"
                type="text"
                text="Hi, I have a question."
                dateString="10:05 AM"
            />

            {/* more messages */}

            <Input
                placeholder="Type your message..."
                defaultValue=""
                multiline={false}
                /*onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        handleSendMessage(event.target.value);
                        event.target.value = '';
                    }
                }}*/
                rightButtons={
                    <button
                        /*onClick={() => {
                            const messageInput = document.getElementById('messageInput');
                            handleSendMessage(messageInput.value);
                            messageInput.value = '';
                        }}*/
                    >
                        Send
                    </button>
                }
            />
        </div>
    )
}
