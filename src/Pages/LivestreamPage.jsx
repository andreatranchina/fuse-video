import React, {useEffect, useState, useRef} from 'react'
import { useSelector} from 'react-redux';
import ChatComponent from '../components/ChatComponent';
import * as webRTC from '../utils/webRTC';
import ButtonsContainer from '../components/video/ButtonsContainer';
import { useThemeContext } from '../theme/ThemeContextProvider';
import { Box } from '@mui/material';
import LoadingOverlay from '../components/video/LoadingOverlay';
import axios from 'axios';
// import ReactPlayer from 'react-player';
import {Button, IconButton} from '@mui/material';
import {v4 as uuidv4 } from "uuid";
import FirebaseStorageService from '../firebase/FirebaseStorageService';
import CloseIcon from '@mui/icons-material/Close';

const LivestreamPage = ({socket}) => {

    const [screenSharingStream, setScreenSharingStream] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isDoneRecording, setIsDoneRecording] = useState(false);
    const [isViewingRecording, setIsViewingRecording] = useState(false);

    const currentLivestream = useSelector((state) => state.room.currentRoom);
    const isStreamer = useSelector((state) => state.room.isStreamer);
    const loggedInUser = useSelector((state) => state.user.defaultUser);
    const participants = useSelector((state) => state.room.participants);
    const showLoadingOverlay = useSelector((state) => state.room.showLoadingOverlay);
    const onlyAudio = useSelector((state) => state.room.onlyAudio);

    const [mediaStream, setMediaStream] = useState(null);

    const [recordedBlob, setRecordedBlob] = useState(null);
    const [recordedBlobUrl, setRecordedBlobUrl] = useState(null);
    const mediaRecorderRef = useRef(null);

    const [videoUrl, setvideoUrl] = useState("");
    const [uploadProgress, setUploadProgress] = useState(-1);
    const fileInputRef = useRef();

    const localScreenRef = useRef();
    const localCameraRef = useRef();
    const { mode } = useThemeContext();

    useEffect(() => {

        const getlocalCameraStream = async () => {
            try{
                let localCameraStream = await webRTC.initLivestreamConnection(isStreamer, 
                    loggedInUser.userName, currentLivestream.code, onlyAudio)
                    
                setMediaStream(localCameraStream);    
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

    const handleStartRecording = () => {
        console.log("cicked start recording");
        if (!mediaStream){
            console.error("mediastream not available");
            return;
        }
        try {
            setIsRecording(true);
            const options = { mimeType: 'video/webm' };
            console.log("state mediastream " + mediaStream);
            const mediaRecorder = new MediaRecorder(mediaStream, options);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                console.log("setting recordedBlob");
                  const recordedBlob = new Blob([event.data], { type: event.data.type });
                  setRecordedBlob(recordedBlob);
                }
            };
            mediaRecorder.start();
            console.log("recording");  
        }
        catch(error){
            console.log(error);
        }
    }

    const handleStopRecording = async () => {
        console.log("clicked");
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            console.log(recordedBlob);
            setIsRecording(false);
            setIsDoneRecording(true);
            try{
                setRecordedBlobUrl(URL.createObjectURL(recordedBlob));
            }
            catch(error){
                console.log(error);
            }
          }
          if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            console.log(recordedBlob);
            try{
                setRecordedBlobUrl(URL.createObjectURL(recordedBlob));
            }
            catch(error){
                console.log(error);
            }
          }    
    }

    const handlePostRecording = async () => {
        const generatedFileId = uuidv4();
        try{
            const downloadUrl = await FirebaseStorageService.uploadFile(
                recordedBlob, `recording/${generatedFileId}`, setUploadProgress);

            setvideoUrl(downloadUrl);

            try{
                const response = await axios.post("http://localhost:3001/api/recordings", {
                    blobUrl: URL.createObjectURL(recordedBlob),
                    downloadUrl: downloadUrl,
                    user_id: loggedInUser.id,
                    livestream_id: 2,
                });

                console.log(response);
            }
            catch(error){
                console.log(error.message);
            }
            // handleUploadFinish(downloadUrl);
        }
        catch(error){
            setUploadProgress(-1);
            fileInputRef.current.value = null;
            alert(error.message);
            throw(error);
        }
    }

    const handleViewRecording = () => {
        handleStopRecording();
        setIsViewingRecording(true);
    }

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
        setScreenSharingStream={setScreenSharingStream} handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording} handlePostRecording={handlePostRecording}
        isRecording = {isRecording}    
        />

        {recordedBlob && (
        <div id={mode === 'light' ? 'recording-popup-light' : 'recording-popup-dark'}>
            <IconButton id="button-exit" onClick={() => setRecordedBlob(null)}><CloseIcon fontSize="large"/></IconButton>
            {!isViewingRecording && 
                <Button id={mode === 'light' ? 'button-view-light' : 'button-view-dark'} 
                    onClick={handleViewRecording}>View Recording
                </Button>}

            {isViewingRecording && (
                <div>
                    <video className="recording-video" src={recordedBlobUrl} controls></video>
                    <Button id={mode === 'light' ? 'button-download-light' : 'button-download-dark'}>
                        <a id={mode === 'light' ? 'download-link-light' : 'download-link-dark'} 
                        href={recordedBlobUrl} download="recorded_video.webm">
                            Download Video
                        </a>
                    </Button>
                    <Button id={mode === 'light' ? 'button-post-light' : 'button-post-dark'} onClick = {handlePostRecording}>Post Now!</Button>
                    {
                    !videoUrl && uploadProgress > -1 ? (
                        <div>
                            <label htmlFor="file">Upload Progress:</label>
                            <progress id="file" value={uploadProgress} max="100">
                                {uploadProgress}%
                            </progress>
                            <span>{uploadProgress}%</span>
                        </div>
                    ) : null
                }
                </div>    
            )}
        </div>    

        )}

        {showLoadingOverlay && <LoadingOverlay />}
    </Box>
  )
}

export default LivestreamPage;