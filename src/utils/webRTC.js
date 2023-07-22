import * as socketIOClient from './socketIO.js';
import Peer from 'simple-peer';

let localStream;

export const initLivestreamConnection = (async (isStreamer, fullName, livestreamCode) => {
    try {
        console.log('sucessfully received local stream');

        if(isStreamer){
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            localStream = stream;
            showLocalLivestreamVideo(localStream);
    
            //dispatch action to hide overlay
            // store.dispatch(setShowOverlay(false));
        }
        isStreamer ? socketIOClient.hostLivestream(fullName, livestreamCode) : socketIOClient.joinLivestream(fullName, livestreamCode);


    }
    catch(error){
        console.log('error occurred when trying to get access to local stream');
        console.log(error);
    }
})

const showLocalLivestreamVideo = (localStream) => {
    const videosContainer = document.getElementById('videos_container');
    const videoContainer = document.createElement('div');
    const videoElement = document.createElement('video');

    videoElement.autoplay = true;
    videoElement.muted = true; //do not want to hear ourselves
    videoElement.srcObject = localStream;
    videoElement.onloadedmetadata = () => {//some browsers like firefox may need this event listener to start playing video on load
        videoElement.play();
    }

    videoContainer.appendChild(videoElement);
    videosContainer.appendChild(videoContainer);
}