import React, {useState, useEffect} from 'react';
import '../styles/callpage.css';
import {useSelector, useDispatch} from 'react-redux';
import {postLivestreamThunk, setCurrentLivestream} from "../redux/livestreams/livestream.actions";
import ChatComponent from '../components/ChatComponent';
import {v4 as uuidv4} from 'uuid';
import Box from '@mui/material/Box'
import FloatingMenu from '../components/navbar/FloatingMenu';
import { useMediaQuery } from '@mui/material'

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const JoinPage = () => {
    const [livestreamCode, setLivestreamCode] = useState("");
    const [username, setUsername] = useState("");
    const [showChat, setShowChat] = useState(false);


    const loggedInUser = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const isSmallScreen = useMediaQuery("(max-width: 900px");
  
    useEffect(() => {

      setUsername(loggedInUser.fullName);
    }, [])
  
    const joinLivestream = async () => {
      if (livestreamCode !==""){
        socket.emit("join_room", livestreamCode);

            dispatch(setCurrentLivestream(response));
    
            setShowChat(true);

      }
    }
  
    return (
      <div className="callPage">
        {!showChat? (
          <div className="joinChatContainer">
            <h3>Join livestream</h3>
            <input type="text" placeholder="livestream code.." onChange={(e) => {setLivestreamCode(e.target.value)}}/>
            <button onClick={joinLivestream}>Join Livestream</button>
          </div>
        ): (<div>
         <h1>Livestream Id: {livestreamCode}</h1>
          <ChatComponent socket={socket} username={username} room={livestreamCode}/>
          </div>
        )         
        }
      <Box sx={{pt:10}} >
        {isSmallScreen 
        ? <div style={{position: 'fixed', left: '50%', bottom: '20px', transform: 'translate(-50%, -50%)',  margin: '0 auto'}}>
            <FloatingMenu />
          </div> 
        : <></>}
      </Box>
  
      </div>
    );
}

export default JoinPage