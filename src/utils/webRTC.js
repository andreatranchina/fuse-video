import * as socketIOClient from './socketIO.js';
import Peer from 'simple-peer';
import { store } from '../redux/store.js';
import { setShowLoadingOverlay } from '../redux/room/room.actions.js';
import { fetchTURNCredentials, getTURNIceServers } from './turn.js';

let localStream;
let needToAddStream = false;
let needToRemoveStream = false;

export const initLivestreamConnection = (async (isStreamer, 
    username, livestreamCode, onlyAudio) => {
    try {
        console.log('sucessfully received local stream');

        if(isStreamer){
            await fetchTURNCredentials();

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: onlyAudio? false: true,
                //can set max resolution for video if slowing computer down
                // video: {width: '480', height: '360'},
            });
            localStream = stream;
            // showLocalLivestreamVideo(localStream);
    
            //dispatch action to hide overlay
            store.dispatch(setShowLoadingOverlay(false));
        }
        isStreamer ? socketIOClient.hostLivestream(username, livestreamCode, onlyAudio) 
        : socketIOClient.joinLivestream(username, livestreamCode, onlyAudio);
        if (!isStreamer){
            needToAddStream = true;
            needToRemoveStream = true;
            store.dispatch(setShowLoadingOverlay(false));
        }
    }
    catch(error){
        console.log('error occurred when trying to get access to local stream');
        console.log(error);
    }
    return localStream;
})

export const initVideoChatConnection = (async (isStreamer, username, livestreamCode, 
    onlyAudio) => {
    try {
        console.log('sucessfully received local stream');
        await fetchTURNCredentials();

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: onlyAudio? false: true,
                //can set max resolution for video if slowing computer down
                // video: {width: '480', height: '360'},
            });
            localStream = stream;
            // showLocalLivestreamVideo(localStream);
    
            //dispatch action to hide overlay
            store.dispatch(setShowLoadingOverlay(false));
        isStreamer ? socketIOClient.hostLivestream(username, livestreamCode, onlyAudio) 
        : socketIOClient.joinLivestream(username, livestreamCode, onlyAudio);
        needToAddStream = true;
        needToRemoveStream = true;
    }
    catch(error){
        console.log('error occurred when trying to get access to local stream');
        console.log(error);
    }
    return localStream;
})

let peers = {};
let streams = [];

const getConfiguration = () => {
    const turnIceServers = getTURNIceServers();

    if(turnIceServers){
        console.log("TURN server credentials fetched");
        console.log(turnIceServers);
        return {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },
                ...turnIceServers,        
            ]
        }
    } else {
        console.warn("using only STUN server");
        return {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                }
            ]
        }
    }


}

export const prepareNewPeerConnection = (connectedUserSocketId, isInitiator) => {
    //new peer connection is prepared
    const configuration = getConfiguration();

    peers[connectedUserSocketId] = new Peer({
        initiator: isInitiator,
        stream: localStream,
        config: configuration
    })

    //when passing peer connection on second round (from active side, isInitiator=true), it will then automatically
    //start sending signaling data
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

export const removePeerConnection = (data) => {
    //remove video element and peer connection
    const {socketId} = data;

    if (needToRemoveStream){
        //we have been assigning socketIds as id to the video elements, so now can remove based on socketId
        const videoContainer = document.getElementById(socketId);
        const videoElement = document.getElementById(`${socketId}-video`);
    
        if(videoContainer && videoElement){
            const tracks = videoElement.srcObject.getTracks();
    
            tracks.forEach((track) => track.stop()); //to make sure we dont have any empty video tracks still running
    
            videoElement.srcObject = null;
            videoContainer.removeChild(videoElement);
    
            videoContainer.parentNode.removeChild(videoContainer);
    
            //need to also remove the peer connection object
            if(peers[socketId]){
                peers[socketId].destroy(); //destroy the peer connection
            }
            delete peers[socketId];
        }
    }
    else{
        if(peers[socketId]){
            peers[socketId].destroy(); //destroy the peer connection
        }
        delete peers[socketId];
    }


}

const showLocalLivestreamVideo = (localStream) => {
    const videosContainer = document.getElementById('videos-container');
    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video-container');
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
    const videosContainer = document.getElementById('videos-container');
    const videoContainer = document.createElement('div');

    videoContainer.id = connectedUserSocketId;
    videoContainer.classList.add('video-container');

    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.srcObject = stream;

    videoElement.id = `${connectedUserSocketId}-video`;
    videoElement.onloadedmetadata = () => {//some browsers like firefox may need this event listener to start playing video on load
        videoElement.play();
    };

    videoContainer.addEventListener('click', () => {
        const videos = document.querySelectorAll(".video-container");
        const videosArray = Array.from(videos);
        if(!videoContainer.classList.contains("enlarged")){
            videosArray.map((video) => {
                if(video !== videoContainer){
                    video.style.display = "none";
                }
                else{
                    video.style.width = "100%";
                }
            })
            videoContainer.classList.add('enlarged');
        } else {
            videosArray.map((video) => {
                if(video !== videoContainer){
                    video.style.display = "inline-block";
                }
                else{
                    video.style.width = "45%";
                }
            })
            videoContainer.classList.remove('enlarged')

        }
    })

    videoContainer.appendChild(videoElement);

    //check if incoming user joined with only audio
    // const participants = store.getState().room.participants;
    // console.log("participants" + JSON.stringify(participants));
    // console.log("conn" + connectedUserSocketId);

    // const participant = participants.find(p => p.socketId === connectedUserSocketId);
    // if(participant?.onlyAudio){
    //     console.log("found participant");
    //     const audioOnlyContainer = getAudioOnlyContainer();
    //     console.log(audioOnlyContainer)
    //     videoContainer.appendChild(audioOnlyContainer);

    // }
    videosContainer.appendChild(videoContainer);

}


export const toggleMicrophone = (isMicrophoneOn) => {
    //in stream we have audio and video tracks, here we only have one in our local stream coming from our own mic
    localStream.getAudioTracks()[0].enabled = isMicrophoneOn? true : false;
}

export const toggleCamera = (isCameraOn) => {
    localStream.getVideoTracks()[0].enabled = isCameraOn? true : false;
}

export const toggleScreenShare = (isScreenSharing, screenSharingStream = null) => {//default screenSharingStream is null if nothing passed
    if(isScreenSharing){
        //switch track from camera to screen
        switchVideoTracks(localStream);
    }
    else{
        //switch track from screen to camera
        switchVideoTracks(screenSharingStream);
    }
}

export const switchVideoTracks = (stream) => {
    for (let socket_id in peers) {//each peers object used socketId as key
        //replace video track (switch) in each peer connection
        //parameters of replaceTrack():
        //1 - track which should be replaced, 2 - new track to replace with, 3 - stream to which you want to attach the video
        for (let index in peers[socket_id].streams[0].getTracks()) {
          for (let index2 in stream.getTracks()) {
            if (
              peers[socket_id].streams[0].getTracks()[index].kind ===
              stream.getTracks()[index2].kind
            ) {
              peers[socket_id].replaceTrack(
                peers[socket_id].streams[0].getTracks()[index],
                stream.getTracks()[index2],
                peers[socket_id].streams[0]
              );
              break;
            }
          }
        }
    }
}

// const getAudioOnlyContainer = () => {
//     const audioOnlyContainer = document.createElement('div');
//     audioOnlyContainer.classList.add('only-audio-container');

//     const audioOnlyLabel = document.createElement('p');
//     audioOnlyLabel.classList.add('audio-only-text');
//     audioOnlyLabel.innerHTML = "Only audio";

//     audioOnlyContainer.appendChild(audioOnlyLabel);
//     return audioOnlyContainer;
// }