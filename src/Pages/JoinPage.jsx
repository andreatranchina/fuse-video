import React, {useState} from 'react';
import '../styles/chatComponent.css';
import {useDispatch} from 'react-redux';
import {setCurrentLivestream} from "../redux/livestreams/livestream.actions";
import Box from '@mui/material/Box'
import FloatingMenu from '../components/navbar/FloatingMenu';
import { useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JoinPage = ({socket}) => {
    const [livestreamCode, setLivestreamCode] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery("(max-width: 900px");
  
    //called to join livestream upon clicking join livestream button
    const joinLivestream = async () => {
      if (livestreamCode !==""){
        // socket.emit("join_room", livestreamCode); //join socket room based on inputted livestream code

        try{
            //fetch the livestream to join from db based on inputed livestream code
            const response = await axios.get(`http://localhost:3001/api/livestreams/byCode/${livestreamCode}`);
            const responseData = response.data;

            //set currently joined livestream in redux
            dispatch(setCurrentLivestream(responseData));

            //navigate to specific livestream page
            navigate(`/livestream/${livestreamCode}`);
        }
        catch(error){
            console.log(error);
        }
      }
    }
  
    return (
      <div className="callPage" style={{marginTop: "4rem"}}>
          <div className="joinChatContainer">
            <h3>Join livestream</h3>
            <input type="text" placeholder="livestream code.." onChange={(e) => {setLivestreamCode(e.target.value)}}/>
            <button onClick={joinLivestream}>Join Livestream</button>
          </div>

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