import React, {useState, useEffect} from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

const ChatComponent = ({socket, username, room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async() => {
        if(currentMessage) {
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
            {messageList.map((messageContent) => {
                return (<div className="message" id={username === messageContent.author? "you" : "other"}>
                        <div>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{messageContent.time}</p>
                            <p id="author">{messageContent.author}</p>
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
