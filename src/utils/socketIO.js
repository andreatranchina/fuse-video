import io from 'socket.io-client';
import {store }from '../redux/store';
import { setParticipants } from '../redux/livestreams/livestream.actions';

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