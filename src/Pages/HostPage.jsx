import React, {useState} from 'react';
import '../styles/chatComponent.css';
import {useSelector, useDispatch} from 'react-redux';
import {postLivestreamThunk} from "../redux/livestreams/livestream.actions";
import { postVideochatThunk } from '../redux/videochats/videochat.actions';
import { setCurrentRoom, setIsStreamer, setOnlyAudio } from '../redux/room/room.actions';
import {v4 as uuidv4} from 'uuid';
import Box from '@mui/material/Box'
import FloatingMenu from '../components/navbar/FloatingMenu';
import { useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import "../styles/hostPage.css";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const HostPage = ({socket}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [choseType, setChoseType] = useState("");

    const loggedInUser = useSelector((state) => state.user);
    const onlyAudio = useSelector((state) => state.room.onlyAudio);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery("(max-width: 900px");

    const handleChangeCheckbox = () => {
      dispatch(setOnlyAudio(!onlyAudio));
    }

    //call to startLivestream on cliking host livestream button
    const startLivestream = async () => {
        const v4Id = uuidv4();

      if (title !=="" && description !==""){
        // socket.emit("join_room", v4Id); //join socket room

        // email trigger for backend
        console.log(loggedInUser);
        const sendNotificationsResponse = await fetch(`http://localhost:3001/api/follows/sendNotifications?userId=${loggedInUser.id}&livestreamCode=${v4Id.toString()}`, {
          method: 'GET',
          credentials: 'include', 
        });

        if (sendNotificationsResponse.ok) {
          console.log('email notification sent successfully');
        } else {
          console.error('error sending email');
        }


        const sendTextNotification = await fetch(`http://localhost:3001/api/follows/followers/phoneNumbers/${loggedInUser.id}`, {
            method: 'GET',
            credentials: 'include',
          });

          if (sendTextNotification.ok) {
            console.log('Text sent front end');
          } else {
            console.error('Text error front end');
          }



        //set is streamer in redux to true, or else video and audio of this person would not be shared
        dispatch(setIsStreamer(true)); //every host is a streamer (both in livestream and video chat case)

        if(choseType === "Livestream"){

          //create new livestream object to store in db
          const livestream = {
            user_id: loggedInUser.id,
            title,
            description,
            code: v4Id.toString(),
          };

          //store livestream object in db
          const response = await dispatch((postLivestreamThunk(livestream)));

          //set current livestream in redux
          dispatch(setCurrentRoom(response));

          //navigate to specific livestream page or video chat page
          navigate(`/livestream/${v4Id}`);
        }
        else{//user chose to host video chat
          //create new livestream object to store in db
          const videochat = {
          user_id: loggedInUser.id,
          title,
          description,
          code: v4Id.toString(),
          };

          //store livestream object in db
          const response = await dispatch((postVideochatThunk(videochat)));

          //set current livestream in redux
          dispatch(setCurrentRoom(response));

          navigate(`/videochat/${v4Id}`)
        }

      }
    }
  
    return (
      <div className="callPage" style={{marginTop: "4rem"}}>
        {!choseType
        ? (<div className="minipage">
            <h1 className="minipage-header">Select Room To Host</h1>
            <div className="choice-button-container">
              <button className="choice-button" onClick={() => setChoseType("Livestream")}>Livestream</button>
              <button className="choice-button" onClick={() => setChoseType("Video Chat")}>Video Chat</button>
            </div>
          </div>)
        :  <div className="joinChatContainer">
            <h3>Host {choseType}</h3>
            <input type="text" placeholder="title" onChange={(e) => {setTitle(e.target.value)}}/>
            <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)}/>
            <button onClick={startLivestream}>Start {choseType} </button>
            <button onClick={() => setChoseType("")}>Back</button>
            {/* <div>
              <input type="checkbox" name="onlyAudio" onChange={handleChangeCheckbox} checked={onlyAudio}></input>
              <p className="checkbox-label">Only audio</p>
            </div> */}
          </div>
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

export default HostPage