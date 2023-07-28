import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import ScrollToBottom from "react-scroll-to-bottom";
import '../styles/chatComponent.css';
import { postMessagesThunk } from '../redux/messages/message.actions';
import SendIcon from '@mui/icons-material/Send';

const ChatComponent = ({socket, username, room, type}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const loggedInUser = useSelector((state) => state.user);
    const currentRoom = useSelector((state) => state.room.currentRoom);
    const dispatch = useDispatch();

    const sendMessage = async() => {
        let newMessageToDb = null;
        if (type==="livestream"){
            newMessageToDb = {
                content: currentMessage,
                user_id: loggedInUser.id,
                livestream_id: currentRoom.id,
            }
        }
        else{
            newMessageToDb = {
                content: currentMessage,
                user_id: loggedInUser.id,
                videochat_id: currentRoom.id,
            }           
        }

        if(currentMessage) { //do not want to send null message
            dispatch(postMessagesThunk(newMessageToDb));

            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + " : " + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData])
            setCurrentMessage("");

        }
    }

    useEffect(() => {
        //data has username, time, and message  -> data.message
        socket.on("receive_message", (data) => {
            console.log(data,'was a received message')
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
            {messageList.map((messageContent) => {
                return (<div className="message" id={username === messageContent.author? "you" : "other"}>
                        <div>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{messageContent.time}</p>
                            <p id="author">{username === messageContent.author? "You" : messageContent.author}</p>
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
            <button onClick={sendMessage}><SendIcon style={{marginRight: "0.5rem"}}/></button>
        </div>
    </div>
  )
}

export default ChatComponent
