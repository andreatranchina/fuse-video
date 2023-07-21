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
            console.log("running thunk");
            console.log("livestream in thunk: " + JSON.stringify(livestream));
            const res = await axios.post("http://localhost:3001/api/livestreams", {
                user_id: livestream.user_id,
                title: livestream.title,
                description: livestream.description,
            });
            console.log("res in thunk: " + res)
            dispatch(postLivestream(res.data));
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
            const res = await axios.get("http://localhost:3001/api/livestreams");
            dispatch(fetchAllLivestreams(res.data));
        }
        catch (error) {
            console.log(error.message);
        }
    }
}