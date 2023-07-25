import React, {useState} from 'react';
import '../styles/callpage.css';
import {useSelector, useDispatch} from 'react-redux';
import {postLivestreamThunk, setCurrentLivestream, setIsStreamer} from "../redux/livestreams/livestream.actions";
import {v4 as uuidv4} from 'uuid';
import Box from '@mui/material/Box'
import FloatingMenu from '../components/navbar/FloatingMenu';
import { useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const HostPage = ({socket}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const loggedInUser = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery("(max-width: 900px");

    //call to startLivestream on cliking host livestream button
    const startLivestream = async () => {
        const v4Id = uuidv4();

      if (title !=="" && description !==""){
        // socket.emit("join_room", v4Id); //join socket room

        //create new livestream object to store in db
        const livestream = {
            user_id: loggedInUser.id,
            title,
            description,
            code: v4Id.toString(),
        };


        // email trigger for backend
        const sendNotificationsResponse = await fetch(`http://localhost:3001/api/follows/sendNotifications?userId=${loggedInUser.id}&livestreamCode=${v4Id.toString()}`, {
          method: 'GET',
          credentials: 'include', 
        });

        if (sendNotificationsResponse.ok) {
          console.log('email notification sent successfully');
        } else {
          console.error('error sending email');
        }


        //store livestream object in db
        const response = await dispatch((postLivestreamThunk(livestream)));

        //set current livestream in redux
        dispatch(setCurrentLivestream(response));

        //set is streamer in redux to true 
        //(if not called person joining would not be considered the host and video would not share)
        dispatch(setIsStreamer(true));

        //navigate to specific livestream page
        navigate(`/livestream/${v4Id}`);
      }
    }
  
    return (
      <div className="callPage" style={{marginTop: "5rem"}}>

          <div className="joinChatContainer">
            <h3>Host livestream</h3>
            <input type="text" placeholder="title" onChange={(e) => {setTitle(e.target.value)}}/>
            <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)}/>
            <button onClick={startLivestream}>Host livestream</button>
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

export default HostPage