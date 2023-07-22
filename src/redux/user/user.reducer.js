import { GET_USER, REMOVE_USER, EDIT_PROFILE } from "./user.types";


export const INITIAL_USER_STATE = {
  defaultUser: {},
  isEditing: false
}

export default function userReducer(state = INITIAL_USER_STATE, action) {
    switch (action.type) {
      case GET_USER:
        return action.payload;
      case REMOVE_USER:
        return {
        ...INITIAL_USER_STATE
      };
      case EDIT_PROFILE:
        return {
          ...state, isEditing: !state.isEditing
      }
      // case EDIT_PROFILE
      default:
        return state;
    }
  }