import { POST_LIVESTREAM, FETCH_ALL_LIVESTREAMS, SET_CURRENT_LIVESTREAM, 
    SET_IS_STREAMER } from "./livestream.types";

export const INITIAL_LIVESTREAMS_STATE = {
    livestreamList: [],
    currentLivestream: {},
    isStreamer: false,
};

export default function livestreamReducer(state = INITIAL_LIVESTREAMS_STATE, action) {
    switch (action.type) {
        case FETCH_ALL_LIVESTREAMS:
            return { ...state, livestreamList: action.payload};

        case POST_LIVESTREAM:
            return {
                ...state,
                livestreamList: [...state.livestreamList, action.payload],
            };

        case SET_CURRENT_LIVESTREAM:
            return{
                ...state,
                currentLivestream: action.payload
            }    
        
        case SET_IS_STREAMER:
            return{
                ...state,
                isStreamer: action.payload
            }
        default:
            return state;
    }
}