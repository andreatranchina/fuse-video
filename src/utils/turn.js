import axios from 'axios';
let TURNIceServers = null;

export const fetchTURNCredentials = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/turn/getCredentials`);
    const responseData = response.data;

    if (responseData.token?.iceServers){
        TURNIceServers = responseData.token.iceServers;
        console.log(TURNIceServers + "in turn.js")
    }
    console.log("called fetch");
    return TURNIceServers;
}

export const getTURNIceServers = () => {
    return TURNIceServers;
}