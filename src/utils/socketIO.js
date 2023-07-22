import io from 'socket.io-client';

let socket = null;

export const connectWithSocketIO = () => {
    socket = io("http://localhost:3001");

    socket.on("connect", () => {
        console.log('successfully connected with socket io server');
    })

    return socket;
}