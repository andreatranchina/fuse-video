import { POST_MESSAGE, FETCH_ALL_MESSAGES } from "./message.types";

export const INITIAL_MESSAGES_STATE = {
    messageList: []
};

export default function messageReducer(state = INITIAL_MESSAGES_STATE, action) {
    switch (action.type) {
        case FETCH_ALL_MESSAGES:
            return { ...state, messageList: action.payload};

        case POST_MESSAGE:
            return {
                ...state,
                messageList: [...state.messageList, action.payload],
            };
        default:
            return state;
    }
}