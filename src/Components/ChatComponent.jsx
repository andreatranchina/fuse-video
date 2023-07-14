import React, { useState } from 'react';
import 'react-chat-elements/dist/main.css';
import { ChatItem, MessageBox, Input } from 'react-chat-elements';

const PhotoMessage = ({ position, text, date, file }) => (
    <div className={`message-${position}`}>
        <div>{text}</div>
        <img src={file.url} alt={text} />
        <div>{date}</div>
    </div>
);

export const ChatBox = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInput = (value) => {
        setInput(value);
    };

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

    const handleFileUpload = (event) => {
        const fileList = event.target.files;
        const newMessages = Array.from(fileList).map((file) => {
            if (file && file.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(file);
                return {
                    position: 'right',
                    type: 'photo',
                    text: file.name,
                    file: {
                        name: file.name,
                        url: imageUrl,
                    },
                    date: new Date().toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                    }),
                };
            }
            return null;
        });

        const validNewMessages = newMessages.filter((message) => message !== null);

        setMessages((prevMessages) => [...prevMessages, ...validNewMessages]);
    };

    return (
        <div>
            <ChatItem alt="Chat" title="Meeting Chat" />

            {messages.map((message, index) => {
                if (message.type === 'photo') {
                    return (
                        <PhotoMessage
                            position={message.position}
                            text={message.text}
                            date={message.date}
                            file={message.file}
                            key={index}
                        />
                    );
                }

                return (
                    <MessageBox
                        position={message.position}
                        type={message.type}
                        text={message.text}
                        date={message.date}
                        file={message.file}
                        key={index}
                    />
                );
            })}

            <label>
                Click or Drop Images:
                <input type="file" accept="image/*" onChange={handleFileUpload} />
            </label>

            <Input
                placeholder="Send a message"
                value={input}
                onChange={(event) => handleInput(event.target.value)}
                rightButtons={<button onClick={handleSendMessage}>Send</button>}
            />
        </div>
    );
};
