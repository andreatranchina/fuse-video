import axios from "axios";

import {POST_LIVESTREAM} from "./livestream.types";

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
            // const res = await axios.post("http://localhost:8080/api/campuses", {
            //     name: campus.name,
            //     imageUrl: campus.imageUrl,
            //     address: campus.address,
            //     description: campus.description,
            // });
            const res = await axios.post("https://crud-backend-dusky.vercel.app/api/campuses", {
                user_id: livestream.user_id,
                title: livestream.title,
                description: livestream.description,
            });
            dispatch(postLivestream(res.data));
        }
        catch (error) {
            console.log(error.message);
        }
    }

}