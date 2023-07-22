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
            showLocalVideoPreview(localStream);
    
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

const showLocalVideoPreview = (localStream) => {

}