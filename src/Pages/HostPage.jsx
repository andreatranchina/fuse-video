import React, {useState, useEffect} from 'react';
import '../styles/callpage.css';
import {useSelector, useDispatch} from 'react-redux';
import {postLivestreamThunk} from "../redux/livestreams/livestream.actions";
import ChatComponent from '../components/ChatComponent';
import {v4 as uuidv4} from 'uuid';

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const HostPage = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const loggedInUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
  
    useEffect(() => {
      console.log(loggedInUser);
      setUsername(loggedInUser.fullName);
    }, [])
  
    const startLivestream = () => {
        const v4Id = uuidv4(); 
        console.log(v4Id);
        console.log("userID : " + loggedInUser.id);

      if (title !=="" && description !==""){
        socket.emit("join_room", title);

        const livestream = {
            user_id: loggedInUser.id,
            title,
            description
        };

        const response = dispatch((postLivestreamThunk(livestream)));
        const responseData = response.data;
        console.log("response data: " + responseData);

        setShowChat(true);
  
    }
    }
  
    return (
      <div className="callPage">
        {!showChat? (
          <div className="joinChatContainer">
            <h3>Join chat</h3>
            <input type="text" placeholder="title" onChange={(e) => {setTitle(e.target.value)}}/>
            <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)}/>
            <button onClick={startLivestream}>Join room</button>
          </div>
        ): (<div>
          <ChatComponent socket={socket} username={username} room={title}/>
          </div>
          )
            
        }
  
      </div>
    );
}

export default HostPage