import io from 'socket.io-client';
import {store }from '../redux/store';
import { setParticipants } from '../redux/livestreams/livestream.actions';
import * as webRTC from './webRTC';

let socket = null;

export const connectWithSocketIO = () => {
    socket = io("http://localhost:3001");

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

export const hostLivestream = (fullName, livestreamCode) => {
    const data = {
        fullName,
        livestreamCode,
    }

    socket.emit("host-new-livestream", data);
}


export const joinLivestream = (fullName, livestreamCode) => {
    const data = {
        fullName,
        livestreamCode,
    }

    socket.emit("join-livestream", data);
}

export const signalPeerData = (data) => {
    socket.emit("connection-signal", data);
}