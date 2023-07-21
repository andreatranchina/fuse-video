import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import ScrollToBottom from "react-scroll-to-bottom";
import '../styles/callpage.css'
import axios from 'axios'

const ChatComponent = ({socket, user_id, livestream}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const loggedInUser = useSelector((state) => state.user.defaultUser);
    
    const sendMessage = async() => {
        if(currentMessage) {
            const messageData = {
                livestream: livestream,
                user_id: user_id, // Set authors name using where user_id = __
                message: currentMessage,
                time: new Date(Date.now()).getHours() + " : " + new Date(Date.now()).getMinutes()
            }
        try {
            await axios.post('https://localhost:3001/api/messages', {
                livestream_id: messageData.livestream, 
                user_id: messageData.user_id, 
                content: messageData.message,
            });
        } catch (error) {
            console.log(error.message);
        }
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData])
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        console.log(loggedInUser);
        socket.on("receive_message", (data) => {
            // console.log(data);
            setMessageList((list) => [...list, data]); //set to list from before with new data
        })

    }, [socket])

  return (
    <div className="chat-window">
        <div className="chat-header">
            <p>Live chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((mes) => {
                                                    {/* Will be changed*/}
                return (<div className="message">
                        <div>
                        <div className="message-content">
                            <p>{mes.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{mes.time}</p>
                            {/* Will be instead where name where user_id == messageContent.user_id */}
                            <p id="author">{mes.user_id}</p>
                        </div>
                        </div>
                    </div>)
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text" placeholder="new message" value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => {e.key === "Enter" && sendMessage()}}               
            />
            <button onClick={sendMessage}>&#8658;</button>
        </div>
    </div>
  )
}

export default ChatComponent
