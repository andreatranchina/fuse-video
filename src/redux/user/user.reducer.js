import { SET_USER, GET_USER, REMOVE_USER, EDIT_ACCOUNT, EDIT_STATUS, EMAIL_FETCH_USER, 
  ERROR_HANDLING, FETCH_USER_BY_ID, FETCH_FOLLOWERS, ADD_PROFILE_TO_VIEWS, 
  REMOVE_PROFILE_FROM_VIEWS, FETCH_FOLLOWINGS } from "./user.types";

export const INITIAL_USER_STATE = {
  defaultUser: null,
  editedProfile:[],
  //a list of all profiles that the user is currently viewing
  openProfiles:[],
  error:null,
  isEditingAccount:false,
  followingIds: [],
  followersIds: [],
}

export default function userReducer(state = INITIAL_USER_STATE, action) {
    switch (action.type) {
      case SET_USER:
        return{
          ...state,
          defaultUser: action.payload,
        }
      case GET_USER:
        return action.payload;
      case REMOVE_USER:
        return {
        ...INITIAL_USER_STATE
      };
      //fetch user by id
      case FETCH_USER_BY_ID:
        return {
          ...state, defaultUser: action.payload
        }
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
      // case FETCH_FOLLOWERS:
      //   return {
      //     ...state,
      //   defaultUser: {
      //     ...state.defaultUser,
      //     followers: action.payload, 
      //   }// Update followers in the defaultUser object
      // };

      case FETCH_FOLLOWERS:
        return{
          ...state, followersIds: action.payload
        }

      case FETCH_FOLLOWINGS:
        return{
          ...state, followingIds: action.payload
        }
      case ADD_PROFILE_TO_VIEWS:
        const { viewUser, viewUserFollowers, mutualFollowers, viewUserFollowersCount } = action.payload;
        //check if the user already in the opened profiles
        const viewUserIndex = state.openProfiles.findIndex((user) => user.id === viewUser.id);

        if (viewUserIndex !== -1) {
          //provide any update to mutual since last view
          const updatedOpenProfiles = [...state.openProfiles];
          updatedOpenProfiles[viewUserIndex] = {
            ...viewUser, viewUserFollowers, mutualFollowers, viewUserFollowersCount
          };
          return {
            ...state, openProfiles: updatedOpenProfiles,
          };
        } else {
          //new view of the profile alongside mutual followers
          return {
            ...state, openProfiles: [...state.openProfiles, { ...viewUser, viewUserFollowers, mutualFollowers}]
          }
        }
      //action.payload = the viewUserId
      case REMOVE_PROFILE_FROM_VIEWS:
        const profileIdToRemove = action.payload;
        return {
          ...state,
          openProfiles: state.openProfiles.filter((user) => user.id != profileIdToRemove),
        };

      default:
        return state;
    }
  }