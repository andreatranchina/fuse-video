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
  const [user_id, setUserId] = useState("");
  const [livestreamId, setLivestreamId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const startLivestream = () => {

    // Get current user id from current session
    // Set username state based on user_id

    if (title !== "" && description !== "" ){

      const livestream = {
        // Pass in user_id
        title,
        description,
      };

      dispatch(postLivestreamThunk(livestream)).then((response) => {
        // Gets room id from data base
        setLivestreamId(response.id); 
        socket.emit("start_livestream", livestreamId);
        setShowChat(true);
      })

  }
  }

  return (
    <div className="callPage">
      {!showChat? (
        <div className="joinChatContainer">
          <h3>Join chat</h3>
          <input type="text" placeholder="title" onChange={(e) => { setTitle(e.target.value) }} />
          <input type="text" placeholder="description" onChange={(e) => { setDescription(e.target.value) }} />
          <button onClick={startLivestream}>Start Livestream</button>
        </div>
      ): (<div>
          <ChatComponent socket={socket} user_id={user_id} room={livestreamId} />
        </div>
        )
          
      }

    </div>
  );
}

export default CallPage;