import { GET_USER, REMOVE_USER } from "./user.types";

const defaultUser = {};

export default function userReducer(state = defaultUser, action) {
    switch (action.type) {
      case GET_USER:
        return action.payload;
      case REMOVE_USER:
        return defaultUser;
      default:
        return state;
    }
  }