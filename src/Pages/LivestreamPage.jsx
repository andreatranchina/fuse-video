import React, {useEffect, useState, useRef} from 'react'
import { useSelector} from 'react-redux';
import ChatComponent from '../components/ChatComponent';
import * as webRTC from '../utils/webRTC';
import ButtonsContainer from '../components/video/ButtonsContainer';
import { useThemeContext } from '../theme/ThemeContextProvider';
import { Box } from '@mui/material';

const LivestreamPage = ({socket}) => {
    const [screenSharingStream, setScreenSharingStream] = useState(null);

    const currentLivestream = useSelector((state) => state.livestreams.currentLivestream);
    const isStreamer = useSelector((state) => state.livestreams.isStreamer);
    const loggedInUser = useSelector((state) => state.user);
    const participants = useSelector((state) => state.livestreams.participants);

    const localScreenRef = useRef();
    const localCameraRef = useRef();
    const { mode } = useThemeContext();

    useEffect(() => {

        const getlocalCameraStream = async () => {
            try{
                let localCameraStream = await webRTC.initLivestreamConnection(isStreamer, loggedInUser.fullName, currentLivestream.code)
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
            {isStreamer?<video muted autoPlay ref={localCameraRef}></video>:null}
        </div>
        <ChatComponent socket={socket} username={loggedInUser.fullName} room={currentLivestream.code}/>


        {isStreamer?<video className="screen-share" muted autoPlay ref={localScreenRef}></video>:null}

        <ButtonsContainer isStreamer={isStreamer} screenSharingStream={screenSharingStream} 
        setScreenSharingStream={setScreenSharingStream}/>
    </Box>
  )
}

export default LivestreamPage;