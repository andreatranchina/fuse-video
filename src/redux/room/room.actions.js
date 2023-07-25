import axios from "axios";

import {SET_CURRENT_ROOM, 
    SET_IS_STREAMER, SET_PARTICIPANTS} from "./room.types";

export const setCurrentRoom = (payload) => {
    return {
        type: SET_CURRENT_ROOM,
        payload: payload,
    }
}

export const setIsStreamer = (payload) => {
    return{
        type: SET_IS_STREAMER,
        payload: payload,
    }
}

export const setParticipants = (payload) => {
    return{
        type: SET_PARTICIPANTS,
        payload: payload,
    }
}