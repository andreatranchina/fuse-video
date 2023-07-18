import { POST_LIVESTREAM } from "./livestream.types";

export const INITIAL_LIVESTREAM_STATE = {
    livestreamList: []
};

export default function livestreamReducer(state = INITIAL_LIVESTREAM_STATE, action) {
    switch (action.type) {
        case POST_LIVESTREAM:
            return {
                ...state,
                livestreamList: [...state.livestreamList, livestream.payload],
            };
        default:
            return state;
    }
}