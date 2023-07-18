import React, { useState } from 'react';
import 'react-chat-elements/dist/main.css';
import { ChatItem, MessageBox, Input } from 'react-chat-elements';
import conferenceAvatar from '../Images/conference-512.jpg';

export const ChatBox = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [fileInput, setFileInput] = useState(null);

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
                const fileURL = URL.createObjectURL(file);
                return {
                    position: 'right',
                    type: 'photo',
                    text: file.name,
                    file: {
                        name: file.name,
                        url: fileURL,
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
        //Emit the file data to the server
        // if (socket && fileInput && fileInput.files.length > 0){
        //     const file = fileInput.files[0];
        //     const reader = new FileReader();

        //     reader.onload = (event) => {
        //         const fileData = {
        //             name: file.name,
        //             type: file.type,
        //             data: event.target.result,
        //         };
        //     socket.emit('send_message', {message : '', file: fileData, room:'<insert room name here>'})
        //     }
        //     reader.readAsDataURL(file)
        // }
    };

    const renderMessageContent = (message) => {
        if (message.type === 'photo') {
            return (
                <div>
                    <div>{message.text}</div>
                    <img src={message.file.url} alt={message.text} style={styles.media} />
                </div>
            );
        }

        return message.text;
    };

    const styles = {
        media: {
            maxWidth: '100%',
            margin: 0,
        },
        messageBox: {
            padding: '100px',
        },
        chatContainer: {
            flexDirection: 'column',
        },
    };

    return (
        <div style={styles.chatContainer}>
            <ChatItem
                avatar={conferenceAvatar} // Set the avatar image
                alt="Chat"
                title="Meeting Chat"
            />

            {messages.map((message, index) => (
                <MessageBox
                    position={message.position}
                    type={message.type}
                    text={renderMessageContent(message)}
                    date={message.date}
                    key={index}
                    containerStyle={styles.messageBox}
                />
            ))}

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                    placeholder="Send a message"
                    value={input}
                    onChange={(event) => handleInput(event.target.value)}
                    rightButtons={
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                ref={setFileInput}
                            />
                            <button onClick={() => fileInput.click()}>Choose File</button>
                            <button onClick={handleSendMessage}>Send</button>
                        </>
                    }
                />
            </div>
        </div>
    );
};
