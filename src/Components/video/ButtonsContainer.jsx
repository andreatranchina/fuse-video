import React, {useState} from 'react';
import * as webRTC from "../../utils/webRTC";
import "../../styles/livestreamPage.css";
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';
import { IconButton } from '@mui/material';
import LinkedCameraRoundedIcon from '@mui/icons-material/LinkedCameraRounded';
import NoPhotographyRoundedIcon from '@mui/icons-material/NoPhotographyRounded';
import ScreenShareRoundedIcon from '@mui/icons-material/ScreenShareRounded';
import StopScreenShareRoundedIcon from '@mui/icons-material/StopScreenShareRounded';
import {Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';


const ButtonsContainer = ({isStreamer, setScreenSharingStream, screenSharingStream,
handleStopRecording, handleStartRecording, handlePostRecording, isRecording}) => {

    const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    const handleLeaveRoom = () => {
        window.location.href = window.location.origin;
    }

    const handleToggleMicrophone = () => {
        webRTC.toggleMicrophone(!isMicrophoneOn);
        setIsMicrophoneOn(!isMicrophoneOn)
    }

    const handleToggleCamera = () => {
        webRTC.toggleCamera(!isCameraOn);
        setIsCameraOn(!isCameraOn);

    }

    const handleToggleScreenShare = async() => {
        if(!isScreenSharing){
            let stream = null;
            try{
                stream = await navigator.mediaDevices.getDisplayMedia({
                    audio: false, //only want the video stream from screen, audio will still come from mediaDevices.getUserMedia();
                    video: true,
                });
            }
            catch(error){
                console.log(error);
            }
            if(stream){
                setScreenSharingStream(stream);
                //switch video track which we are sending to other users
                webRTC.toggleScreenShare(isScreenSharing, stream);

                setIsScreenSharing(true);
            }
        }
        else{
            webRTC.toggleScreenShare(isScreenSharing); //is screen sharing true in this case 
            setIsScreenSharing(false);

            //stop screen share stream
            screenSharingStream.getTracks().forEach(track => track.stop());// note there will only be one track
            setScreenSharingStream(null);
        }
    }

  return (
    <div className="video-buttons-container">
        {(isStreamer && isMicrophoneOn) ? <IconButton size="large" onClick={handleToggleMicrophone} style={{color: "white"}}><MicOffRoundedIcon /></IconButton>
        :(isStreamer && !isMicrophoneOn) ? <IconButton size="large" onClick={handleToggleMicrophone} style={{color: "white"}}><MicRoundedIcon /></IconButton> 
        : null}

        {isStreamer && isCameraOn ?<IconButton size="large" onClick={handleToggleCamera} style={{color: "white"}}><NoPhotographyRoundedIcon /></IconButton>
        :isStreamer && !isCameraOn ?<IconButton size="large" onClick={handleToggleCamera} style={{color: "white"}}><LinkedCameraRoundedIcon /></IconButton>
        :null}

        <Button variant="contained" size="large" onClick={handleLeaveRoom}>Leave</Button>

        {isStreamer && !isScreenSharing?<IconButton size="large" onClick={handleToggleScreenShare} style={{color: "white"}}><ScreenShareRoundedIcon /></IconButton>
        :isStreamer && isScreenSharing?<IconButton size="large" onClick={handleToggleScreenShare} style={{color: "white"}}><StopScreenShareRoundedIcon /></IconButton>
        :null}

        {isStreamer && !isRecording?<IconButton size="large" style={{color: "white"}} onClick={handleStartRecording}><PlayCircleOutlineOutlinedIcon /></IconButton>
        :isStreamer && isRecording?<IconButton size="large" style={{color: "white"}} onClick={handleStopRecording}><StopCircleOutlinedIcon /></IconButton>
        :null}
    </div>
  )
}

export default ButtonsContainer