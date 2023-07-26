import React, {useEffect, useState, useRef} from 'react'
import { useSelector} from 'react-redux';
import ChatComponent from '../components/ChatComponent';
import * as webRTC from '../utils/webRTC';
import ButtonsContainer from '../components/video/ButtonsContainer';
import { useThemeContext } from '../theme/ThemeContextProvider';
import { Box } from '@mui/material';
import LoadingOverlay from '../components/video/LoadingOverlay';

const LivestreamPage = ({socket}) => {
    const [screenSharingStream, setScreenSharingStream] = useState(null);

    const currentLivestream = useSelector((state) => state.room.currentRoom);
    const isStreamer = useSelector((state) => state.room.isStreamer);
    const loggedInUser = useSelector((state) => state.user);
    const participants = useSelector((state) => state.room.participants);
    const showLoadingOverlay = useSelector((state) => state.room.showLoadingOverlay);
    const onlyAudio = useSelector((state) => state.room.onlyAudio);

    const localScreenRef = useRef();
    const localCameraRef = useRef();
    const { mode } = useThemeContext();

    useEffect(() => {

        const getlocalCameraStream = async () => {
            console.log(participants);
            try{
                let localCameraStream = await webRTC.initLivestreamConnection(isStreamer, 
                    loggedInUser.userName, currentLivestream.code, onlyAudio)
                const localCameraVideo = localCameraRef.current;
                localCameraVideo.srcObject = localCameraStream;
                localCameraVideo.onloadedmetadata = () => {
                    localCameraVideo.play();
                }
            }
            catch(error){
                console.log(error);
            }

        }

        getlocalCameraStream();

    }, [])

    useEffect(()=> {
        if(isStreamer){
            const video = localScreenRef.current;
            video.srcObject = screenSharingStream;
            video.onloadedmetadata = () =>{
                video.play();
            }
        }

    }, [screenSharingStream])

  return (
    <Box className="room-container" id={mode === 'light' ? 'home-light' : 'home-dark'} sx={{pt:10, justifyContent:'center', display:'flex'}}>
        <div className="room-details-container">
            <div className="room-details-content">
                <h1>Livestream title: {currentLivestream.title}</h1>
                <h3>Livestream Id: {currentLivestream.code}</h3>
            </div>
        </div>

        <div className="participants-container">
            <h1>Participants</h1>
            {participants? participants.map((participant) => {
                return <p>{participant.name}</p> 
            }):null}
        </div>

        <div className="videos-container" id="videos-container">
            {isStreamer?<div className="video-container"><video muted autoPlay ref={localCameraRef}></video></div>:null}
        </div>
        <ChatComponent socket={socket} username={loggedInUser.userName} 
        room={currentLivestream.code} type={"livestream"}/>


        {isStreamer?<video className="screen-share" muted autoPlay ref={localScreenRef}></video>:null}

        <ButtonsContainer isStreamer={isStreamer} screenSharingStream={screenSharingStream} 
        setScreenSharingStream={setScreenSharingStream}/>

        {showLoadingOverlay && <LoadingOverlay />}
    </Box>
  )
}

export default LivestreamPage;