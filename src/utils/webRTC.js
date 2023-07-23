import * as socketIOClient from './socketIO.js';
import Peer from 'simple-peer';

let localStream;
let needToAddStream = false;

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
        if (!isStreamer){
            needToAddStream = true;
        }


    }
    catch(error){
        console.log('error occurred when trying to get access to local stream');
        console.log(error);
    }
})

let peers = {};
let streams = [];

export const prepareNewPeerConnection = (connectedUserSocketId, isInitiator) => {

    peers[connectedUserSocketId] = new Peer({
        initiator: isInitiator,
        stream: localStream
    })

    peers[connectedUserSocketId].on('signal', (data) => {

        const signalData = {
            signal: data,
            connectedUserSocketId: connectedUserSocketId
        };

        socketIOClient.signalPeerData(signalData);
    });

    peers[connectedUserSocketId].on('stream', (stream) => {
        console.log('new stream came');
        console.log(stream);
        needToAddStream && addStream(stream, connectedUserSocketId);
        streams = [...streams, stream];
    });
}

export const handleSignalingData = (data) => {
    peers[data.connectedUserSocketId].signal(data.signal);
}

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

const addStream = (stream, connectedUserSocketId) => {
    //display incoming stream
    const videosContainer = document.getElementById('videos_container');
    const videoContainer = document.createElement('div');

    // videoContainer.id = connectedUserSocketId;
    // videoContainer.classList.add('video_track_container');

    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.srcObject = stream;

    // videoElement.id = `${connectedUserSocketId}-video`;
    videoElement.onloadedmetadata = () => {//some browsers like firefox may need this event listener to start playing video on load
        videoElement.play();
    }

    videoContainer.appendChild(videoElement);
    videosContainer.appendChild(videoContainer);
}