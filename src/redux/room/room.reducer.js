import { SET_CURRENT_ROOM, 
    SET_IS_STREAMER, SET_PARTICIPANTS} from "./room.types";

export const INITIAL_ROOM_STATE = {
    currentRoom: {},
    isStreamer: false,
    participants: [],
};

export default function roomReducer(state = INITIAL_ROOM_STATE, action) {
    switch (action.type) {
        case SET_CURRENT_ROOM:
            return{
                ...state,
                currentRoom: action.payload
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