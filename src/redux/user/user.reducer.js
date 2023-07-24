import { GET_USER, REMOVE_USER, EDIT_ACCOUNT, EDIT_STATUS } from "./user.types";


export const INITIAL_USER_STATE = {
  defaultUser: {},
  editedProfile:[],
}

export default function userReducer(state = INITIAL_USER_STATE, action) {
    switch (action.type) {
      case GET_USER:
        return action.payload;
      case REMOVE_USER:
        return {
        ...INITIAL_USER_STATE
      };
      //edit the profile information
      case EDIT_ACCOUNT:
      return {
        ...state,
        defaultUser: {
          ...state.defaultUser,
          ...action.payload,
        },
      };
      case EDIT_STATUS:
        return {
          ...state, isEditingAccount: !state.isEditingAccount
      }
      default:
        return state;
    }
  }