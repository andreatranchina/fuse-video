import { GET_USER, REMOVE_USER, EDIT_PROFILE, EDIT_ACCOUNT } from "./user.types";


export const INITIAL_USER_STATE = {
  defaultUser: {},
  isEditingProfile: false,
  isEditingAccount: false
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
          ...state, isEditingProfile: !state.isEditingProfile
      }
      case EDIT_ACCOUNT:
        return {
          ...state, isEditingAccount: !state.isEditingAccount
      }
      // case EDIT_PROFILE
      default:
        return state;
    }
  }