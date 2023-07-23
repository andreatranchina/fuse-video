import React, {useEffect, useState, useRef} from 'react'
import { useSelector} from 'react-redux';
import ChatComponent from '../components/ChatComponent';
import * as webRTC from '../utils/webRTC';
import { typographyClasses } from '@mui/material';

const LivestreamPage = ({socket}) => {
    const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);

    const currentLivestream = useSelector((state) => state.livestreams.currentLivestream);
    const isStreamer = useSelector((state) => state.livestreams.isStreamer);
    const loggedInUser = useSelector((state) => state.user);
    const participants = useSelector((state) => state.livestreams.participants);

    const localPreviewRef = useRef();

    useEffect(() => {
        webRTC.initLivestreamConnection(isStreamer, loggedInUser.fullName, currentLivestream.code)

    }, [])

    useEffect(()=> {
        const video = localPreviewRef.current;
        video.srcObject = screenSharingStream;
        video.onloadedmetadata = () =>{
            video.play();
        }
    }, [screenSharingStream])

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

                webRTC.toggleScreenShare(isScreenSharing, stream);

                setIsScreenSharing(true);

                //switch video track which we are sending to other users
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
    <div style={{marginTop: "5rem"}}>
        <h1>Livestream title: {currentLivestream.title}</h1>
        <h1>Livestream Id: {currentLivestream.code}</h1>
        <h1>Participants</h1>
        {participants? participants.map((participant) => {
            return <p>{participant.name}</p> 
        }):null}
        <ChatComponent socket={socket} username={loggedInUser.fullName} room={currentLivestream.code}/>
        {isStreamer?<button onClick={handleToggleMicrophone}>Toggle Mic</button>:null}
        {isStreamer?<button onClick={handleToggleCamera}>Toggle Camera</button>:null}
        <button onClick={handleLeaveRoom}>Leave Room</button>
        {isStreamer?<button onClick={handleToggleScreenShare}>Toggle Screenshare</button>:null}
        <video muted autoPlay ref={localPreviewRef}></video>
    </div>
  )
}

export default LivestreamPage