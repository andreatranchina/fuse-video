import * as socketIOClient from './socketIO.js';
import Peer from 'simple-peer';

export const getLocalPreviewAndInitRoomConnection = (async (isRoomHost, identity, roomId) => {
    try {
        console.log('sucessfully received local stream');
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        localStream = stream;
        showLocalVideoPreview(localStream);

        //dispatch action to hide overlay
        store.dispatch(setShowOverlay(false));


        isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId);


    }
    catch(error){
        console.log('error occurred when trying to get access to local stream');
        console.log(error);
    }
})