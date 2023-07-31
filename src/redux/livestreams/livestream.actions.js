import axios from "axios";

import {POST_LIVESTREAM, FETCH_ALL_LIVESTREAMS} from "./livestream.types";

// Redux action for making new livestream row
export const postLivestream = (payload) => {
    return {
        type: POST_LIVESTREAM,
        payload: payload,
    }
}

export const postLivestreamThunk = (livestream) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("https://video-backend-6mkl.onrender.com/api/livestreams", {
                user_id: livestream.user_id,
                title: livestream.title,
                description: livestream.description,
                code: livestream.code,
            });
            dispatch(postLivestream(res.data));
            return res.data;
        }
        catch (error) {
            console.log(error.message);
        }
    }
}

export const fetchAllLivestreams = (payload) => {
    return {
        type: FETCH_ALL_LIVESTREAMS,
        payload: payload,
    }
}

export const fetchAllLivestreamsThunk = (livestream) => {
    return async (dispatch) => {
        try {
            const res = await axios.get("https://video-backend-6mkl.onrender.com/api/livestreams");
            dispatch(fetchAllLivestreams(res.data));
        }
        catch (error) {
            console.log(error.message);
        }
    }
}