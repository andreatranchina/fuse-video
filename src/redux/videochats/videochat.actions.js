import axios from "axios";

import {POST_VIDEOCHAT, FETCH_ALL_VIDEOCHATS} from "./videochat.types";

// Redux action for making new livestream row
export const postVideochat = (payload) => {
    return {
        type: POST_VIDEOCHAT,
        payload: payload,
    }
}

export const postVideochatThunk = (videochat) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("https://video-backend-6mkl.onrender.com/api/videochats", {
                user_id: videochat.user_id,
                title: videochat.title,
                description: videochat.description,
                code: videochat.code,
            });
            dispatch(postVideochat(res.data));
            return res.data;
        }
        catch (error) {
            console.log(error.message);
        }
    }
}

export const fetchAllVideochats = (payload) => {
    return {
        type: FETCH_ALL_VIDEOCHATS,
        payload: payload,
    }
}

export const fetchAllVideochatsThunk = (videochat) => {
    return async (dispatch) => {
        try {
            const res = await axios.get("https://video-backend-6mkl.onrender.com/api/videochats");
            dispatch(fetchAllVideochats(res.data));
        }
        catch (error) {
            console.log(error.message);
        }
    }
}