import React, {useState} from 'react';
import '../styles/chatComponent.css';
import {useSelector, useDispatch} from 'react-redux';
import {postLivestreamThunk} from "../redux/livestreams/livestream.actions";
import { postVideochatThunk } from '../redux/videochats/videochat.actions';
import { setCurrentRoom, setIsStreamer, setOnlyAudio } from '../redux/room/room.actions';
import {v4 as uuidv4} from 'uuid';
import { Box, Tooltip, Typography } from '@mui/material'
import { useMediaQuery, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import "../styles/hostPage.css";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import axios from 'axios';
import { useThemeContext } from '../theme/ThemeContextProvider';

const HostPage = ({socket}) => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [choseType, setChoseType] = useState("");

    const loggedInUser = useSelector((state) => state.user.defaultUser);
    const onlyAudio = useSelector((state) => state.room.onlyAudio);

    const { mode, theme } = useThemeContext();

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
        // const sendNotificationsResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/follows/sendNotifications?userId=${loggedInUser.id}&livestreamCode=${v4Id.toString()}`, {
        //   method: 'GET',
        //   credentials: 'include',
        // });

        const sendNotificationsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/follows/sendNotifications?userId=${loggedInUser.id}&livestreamCode=${v4Id.toString()}`);

        if (sendNotificationsResponse.ok) {
          console.log('email notification sent successfully');
        } else {
          console.error('error sending email');
        }


        // const sendTextNotification = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/follows/phoneNumbers?userId=${loggedInUser.id}&livestreamCode=${v4Id.toString()}`, {
        //     method: 'GET',
        //     credentials: 'include',
        //   });


        const sendTextNotification = axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/follows/phoneNumbers?userId=${loggedInUser.id}&livestreamCode=${v4Id.toString()}`);

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
      <div className="callPage" style={{marginTop: "10rem"}}>
        {!choseType
        ? (<div className="minipage" >
          <Box id={mode === 'light' ? 'signup-light' : 'signup-dark'} sx={{overflow:'contain'}}>
            <Typography variant='h2' sx={{fontFamily:'Bungee Inline', transform:'translateY(40px)', WebkitTextStrokeWidth: '1px', 
								WebkitTextStrokeColor: mode === 'light' ? 'white' : theme.palette.background.fab.default}}> Room To Host</Typography>
            <div className="choice-button-container" style={{transform:'translateY(120px)'}}>
              <button className="choice-button" onClick={() => setChoseType("Livestream")}><Typography sx={{fontFamily:`'Bungee Hairline',cursive`, fontWeight:700, WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:'white'}}>Livestream</Typography></button>
              <button className="choice-button" onClick={() => setChoseType("Video Chat")}><Typography sx={{fontFamily:`'Bungee Hairline',cursive`, fontWeight:700, WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:'white'}}>Video Chat</Typography></button>
            </div>
            </Box>
          </div>)
        :  <div className="joinChatContainer minipage">
        <Box id={mode === 'light' ? 'signup-light' : 'signup-dark'} sx={{oveflow:'contain'}}>
            <Typography variant='h2' sx={{fontFamily:'Bungee Inline', transform:'translateY(40px)', WebkitTextStrokeWidth: '1px', 
								WebkitTextStrokeColor: mode === 'light' ? 'white' : theme.palette.background.fab.default}}>Host {choseType}</Typography>
                <Box sx={{transform:'translateY(100px)'}}>
            <input type="text" placeholder="title" onChange={(e) => {setTitle(e.target.value)}}/>
            <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)}/>
            <div className="container-buttons-preroom">
            <Tooltip title="Go back" placement="left"><Button className="back-button" onClick={() => setChoseType("")}><ArrowBackIosNewRoundedIcon /></Button></Tooltip>
              <Button onClick={startLivestream} ><Typography sx={{fontFamily:`'Bungee Hairline',cursive`, fontWeight:700, WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:'white'}}>Start {choseType}</Typography></Button>
            </div>
            {/* <div>
              <input type="checkbox" name="onlyAudio" onChange={handleChangeCheckbox} checked={onlyAudio}></input>
              <p className="checkbox-label">Only audio</p>
            </div> */}
            </Box>
            </Box>
          </div>
        }
  
      </div>
    );  
}

export default HostPage
