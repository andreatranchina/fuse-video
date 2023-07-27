import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import ChatComponent from '../components/ChatComponent';
import * as webRTC from '../utils/webRTC';
import ButtonsContainer from '../components/video/ButtonsContainer';
import { useThemeContext } from '../theme/ThemeContextProvider';
import { Box } from '@mui/material';
import { setIsStreamer } from '../redux/room/room.actions';
import LoadingOverlay from '../components/video/LoadingOverlay';

const VideoChatPage = ({socket}) => {
    const [screenSharingStream, setScreenSharingStream] = useState(null);

    const currentVideochat = useSelector((state) => state.room.currentRoom);
    const isStreamer = useSelector((state) => state.room.isStreamer);
    const loggedInUser = useSelector((state) => state.user);
    const participants = useSelector((state) => state.room.participants);
    const showLoadingOverlay = useSelector((state) => state.room.showLoadingOverlay);
    const onlyAudio = useSelector((state) => state.room.onlyAudio);

    const localScreenRef = useRef();
    const localCameraRef = useRef();
    const { mode } = useThemeContext();

    const dispatch = useDispatch();

    const handleEnlarge = (event) => {
        const clickedVideoContainer = event.target.parentNode;
        const videos = document.querySelectorAll(".video-container");
        const videosArray = Array.from(videos);
        if(!clickedVideoContainer.classList.contains("enlarged")){
            videosArray.map((video) => {
                if(video !== clickedVideoContainer){
                    video.style.display = "none";
                }
                else{
                    video.style.width = "100%";
                }
            })
            clickedVideoContainer.classList.add("enlarged")
        } else {
            videosArray.map((video) => {
                if(video !== clickedVideoContainer){
                    video.style.display = "inline-block";
                }
                else{
                    video.style.width = "45%";
                }
            })
            clickedVideoContainer.classList.remove("enlarged")
        }
    }

    useEffect(() => { 
        //in video chat meetings everyone is a streamer (will share audio and video)
        dispatch(setIsStreamer(true));

        const getlocalCameraStream = async () => {
            try{
                let localCameraStream = await webRTC.initVideoChatConnection(
                    isStreamer, loggedInUser.userName, currentVideochat.code, onlyAudio)
                const localCameraVideo = localCameraRef.current;
                localCameraVideo.srcObject = localCameraStream;
                localCameraVideo.onloadedmetadata = () => {
                    localCameraVideo.play();
                }
                // if(onlyAudio){
                //     localCameraVideo.style.display = "none";

                // }
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
                <h1>Video Chat Title: {currentVideochat.title}</h1>
                <h3>Video Chat Id: {currentVideochat.code}</h3>
            </div>
        </div>

        <div className="participants-container">
            <h1>Participants</h1>
            {participants? participants.map((participant) => {
                return <p>{participant.name}</p> 
            }):null}
        </div>

        <div className="videos-container" id="videos-container">
            {isStreamer?<div className="video-container" onClick={(e) => handleEnlarge(e)}>
                            <video muted autoPlay ref={localCameraRef}></video>
                        </div>:null}
        </div>
        <ChatComponent socket={socket} username={loggedInUser.userName} 
        room={currentVideochat.code} type={"videochat"}/>

        {isStreamer?<video className="screen-share" muted autoPlay ref={localScreenRef}></video>:null}

        <ButtonsContainer isStreamer={isStreamer} screenSharingStream={screenSharingStream} 
        setScreenSharingStream={setScreenSharingStream}/>

        {showLoadingOverlay && <LoadingOverlay />}
    </Box>
  )
}

export default VideoChatPage