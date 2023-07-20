import React, {useState, useEffect} from 'react';
import '../styles/callpage.css';
import { useDispatch } from 'react-redux';
import { postLivestreamThunk } from '../redux/livestreams/livestream.actions';


import ChatComponent from '../components/ChatComponent';

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");


function CallPage() {

  const dispatch = useDispatch();

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const startRoom = () => {
    if (username !== "" && title !== "" && description !== "" ){

      const livestreamData = {
        title,
        description,
      };

      dispatch(postLivestreamThunk(livestreamData))
      // Get room id from data base
      socket.emit("start_room", room);
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
          <button onClick={startRoom}>Start room</button>
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