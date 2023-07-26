import { GET_USER, REMOVE_USER, EDIT_ACCOUNT, EDIT_STATUS, EMAIL_FETCH_USER, ERROR_HANDLING } from "./user.types";

export const INITIAL_USER_STATE = {
  defaultUser: null,
  editedProfile:[],
  error:null,
  isEditingAccount:false
}

export default function userReducer(state = INITIAL_USER_STATE, action) {
    switch (action.type) {
      case GET_USER:
        return action.payload;
      case REMOVE_USER:
        return {
        ...INITIAL_USER_STATE
      };
      //fetch userid by email 
      case EMAIL_FETCH_USER:
        return {
          ...state, defaultUser: action.payload
        }
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
      case ERROR_HANDLING:
          return {
            ...state, error: action.payload
          }
      default:
        return state;
    }
  }