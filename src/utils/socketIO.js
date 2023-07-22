import io from 'socket.io-client';

let socket = null;

export const connectWithSocketIO = () => {
    socket = io("http://localhost:3001");

    socket.on("connect", () => {
        console.log('successfully connected with socket io server');
    })

    return socket;
}

export const hostLivestream = (fullName, livestreamCode) => {
    console.log("hosting livestream");

    const data = {
        fullName,
        livestreamCode,
    }

    socket.emit("host-new-livestream", data);
}


export const joinLivestream = (fullName, livestreamCode) => {
    console.log("joining livestream");

    const data = {
        fullName,
        livestreamCode,
    }

    socket.emit("join-livestream", data);
}