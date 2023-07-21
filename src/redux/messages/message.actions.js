import axios from "axios";

import {POST_MESSAGE, FETCH_ALL_MESSAGES} from "./message.types";

// Redux action for making new livestream row
export const postMessage = (payload) => {
    return {
        type: POST_MESSAGE,
        payload: payload,
    }
}

export const postMessagesThunk = (message) => {
    console.log("running post message thunk ");
    return async (dispatch) => {
        try {
            const res = await axios.post("http://localhost:3001/api/messages", {
                livestream_id: message.livestream_id,
                user_id: message.user_id,
                content: message.content,
            });
            dispatch(postMessage(res.data));
        }
        catch (error) {
            console.log(error.message);
        }
    }
}

export const fetchAllMessages = (payload) => {
    return {
        type: FETCH_ALL_MESSAGES,
        payload: payload,
    }
}

export const fetchAllMessagesThunk = (message) => {
    return async (dispatch) => {
        try {
            const res = await axios.get("http://localhost:3001/api/messages");
            dispatch(fetchAllMessages(res.data));
        }
        catch (error) {
            console.log(error.message);
        }
    }
}