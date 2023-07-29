import React, {useState, forwardRef} from 'react';
import '../styles/chatComponent.css';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentRoom, setOnlyAudio} from "../redux/room/room.actions";
import Box from '@mui/material/Box'
import FloatingMenu from '../components/navbar/FloatingMenu';
import { useMediaQuery, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JoinPage = ({socket}) => {
    const [code, setCode] = useState("");
    const [choseType, setChoseType] = useState("");
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    
    const onlyAudio = useSelector((state) => state.room.onlyAudio);

    const handleOpenSnackbar = () => {
      setIsSnackbarOpen(true);
    };
  
    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setIsSnackbarOpen(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery("(max-width: 900px");

    const handleChangeCheckbox = () => {
      dispatch(setOnlyAudio(!onlyAudio));
    }
  
    //called to join livestream upon clicking join livestream button
    const joinRoom = async () => {

        try{
            if(choseType === "Livestream"){
              //fetch the livestream to join from db based on inputed livestream code
              const response = await axios.get(`http://localhost:3001/api/livestreams/byCode/${code}`);
              const responseData = response.data; //if livestream code does not exist repsonse will be null

              //set currently joined livestream in redux
              dispatch(setCurrentRoom(responseData));

              //navigate to specific livestream or videochat page
              navigate(`/livestream/${code}`);
            }
            else{ //else user chose to join a video chat
                const response = await axios.get(`http://localhost:3001/api/videochats/byCode/${code}`);
                const responseData = response.data;
                dispatch(setCurrentRoom(responseData));
                navigate(`/videochat/${code}`);
            }

        }
        catch(error){
            console.log(error);
            handleOpenSnackbar();
        }
    }
  
    return (
      <div className="callPage" style={{marginTop: "4rem"}}>
        {!choseType
        ? (<div className="minipage">
            <h1 className="minipage-header">Select Room To Join</h1>
            <div className="choice-button-container">
              <button className="choice-button" onClick={() => setChoseType("Livestream")}>Livestream</button>
              <button className="choice-button" onClick={() => setChoseType("Video Chat")}>Video Chat</button>
            </div>
          </div>)
        : <div className="joinChatContainer minipage">
            <h3>Join {choseType}</h3>
            <input type="text" placeholder="livestream code.." onChange={(e) => {setCode(e.target.value)}}/>
            <div className="container-buttons-preroom">
              <Button onClick={joinRoom}>Start {choseType} </Button>
              <Button className="back-button" onClick={() => setChoseType("")}><ArrowBackIosNewRoundedIcon /></Button>
            </div>
            {/* <div>
              <input type="checkbox" name="onlyAudio" onChange={handleChangeCheckbox} checked={onlyAudio}></input>
              <p className="checkbox-label">Only audio</p>
            </div> */}
          </div>}

      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Room ID does not exist - try again
        </Alert>
      </Snackbar>
  
      </div>
    );
}

export default JoinPage