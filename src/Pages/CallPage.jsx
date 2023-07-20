import React, {useState, useEffect} from 'react';
import '../styles/callpage.css';


import ChatComponent from '../components/ChatComponent';

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");


function CallPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && title !== "" && description !== "" ){
      
      // Get room id from data base
      socket.emit("join_room", room);
      setShowChat(true);
  }
  }

  return (
    <div className="callPage">
      {!showChat? (
        <div className="joinChatContainer">
          <h3>Join chat</h3>
          {/*Will not be here, user id will be used to set name */}
          <input type="text" placeholder="name" onChange={(e) => {setUsername(e.target.value)}}/>
          <input type="text" placeholder="title" onChange={(e) => { setTitle(e.target.value) }} />
          <input type="text" placeholder="description" onChange={(e) => { setDescription(e.target.value) }} />
          <button onClick={joinRoom}>Join room</button>
        </div>
      ): (<div>
        <ChatComponent socket={socket} username={username} room={room}/>
        </div>
        )
          
      }

    </div>
  );
}

export default CallPage;