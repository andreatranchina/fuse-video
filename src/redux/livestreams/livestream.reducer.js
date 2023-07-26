import { POST_LIVESTREAM, FETCH_ALL_LIVESTREAMS} from "./livestream.types";

export const INITIAL_LIVESTREAMS_STATE = {
    livestreamList: [],
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
        default:
            return state;
    }
}