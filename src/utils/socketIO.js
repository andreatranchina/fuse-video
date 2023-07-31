import io from 'socket.io-client';
import {store }from '../redux/store';
import { setParticipants } from '../redux/room/room.actions';
import * as webRTC from './webRTC';

let socket = null;

export const connectWithSocketIO = () => {
    socket = io("https://video-backend-6mkl.onrender.com");

    socket.on("connect", () => {
        console.log('successfully connected with socket io server');
    })

    socket.on("update-livestream", (data) => {
        const {participantsInLivestream} = data;
        store.dispatch(setParticipants(participantsInLivestream));
    })

    //users already in room are told to prepare for new peer connection
    socket.on("prepare-connection", (data) => {

        //second parameter indicates whether user is initiator of connection
        webRTC.prepareNewPeerConnection(data.connectedUserSocketId, false); //passive side

        //now prepared for connection, can inform user that joined that
        //already connected users are ready to initialize connection
        socket.emit('initialize-connection', {connectedUserSocketId: data.connectedUserSocketId})

    })

    socket.on("connection-signal", (data) => {
        webRTC.handleSignalingData(data);
    })

    socket.on("initialize-connection", (data) => {
        const {connectedUserSocketId} = data;
        //this time second parameter is true, because this is for the initiator = true
        webRTC.prepareNewPeerConnection(connectedUserSocketId, true); //now initiator is true, active side of connection
    })

    socket.on("user-disconnected", (data) =>{
        webRTC.removePeerConnection(data);
    })

    return socket;
}

export const hostLivestream = (username, livestreamCode, onlyAudio) => {
    const data = {
        username,
        livestreamCode,
        onlyAudio
    }

    socket.emit("host-new-livestream", data);
}


export const joinLivestream = (username, livestreamCode, onlyAudio) => {
    const data = {
        username,
        livestreamCode,
        onlyAudio,
    }

    socket.emit("join-livestream", data);
}

export const signalPeerData = (data) => {
    socket.emit("connection-signal", data);
}

export const sendRemoteStreamsToComponent = (streams) => {
    console.log("running sendremotestremstocomponent " + streams);
    console.log(streams);
    const data = {
        streams,
    }
    console.log(data);
    socket.emit('update-remote-streams', data);
}