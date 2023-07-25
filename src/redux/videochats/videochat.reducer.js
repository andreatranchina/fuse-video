import { POST_VIDEOCHAT, FETCH_ALL_VIDEOCHATS} from "./videochat.types";

export const INITIAL_VIDEOCHATS_STATE = {
    videochatList: [],
};

export default function livestreamReducer(state = INITIAL_VIDEOCHATS_STATE, action) {
    switch (action.type) {
        case FETCH_ALL_VIDEOCHATS:
            return { ...state, videochatList: action.payload};

        case POST_VIDEOCHAT:
            return {
                ...state,
                videochatList: [...state.videochatList, action.payload],
            };
        default:
            return state;
    }
}