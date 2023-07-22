import { POST_LIVESTREAM, FETCH_ALL_LIVESTREAMS, SET_CURRENT_LIVESTREAM, 
    SET_IS_STREAMER, SET_PARTICIPANTS } from "./livestream.types";

export const INITIAL_LIVESTREAMS_STATE = {
    livestreamList: [],
    currentLivestream: {},
    isStreamer: false,
    participants: [],
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

        case SET_PARTICIPANTS:
            return{
                ...state,
                participants: action.payload
            }    
        default:
            return state;
    }
}