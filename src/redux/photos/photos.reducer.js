import {
  UPLOAD_PHOTO_REQUEST,
  UPLOAD_PROFILE_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAILURE,
  UPLOAD_GROUP_PHOTO_SUCCESS,
  EDIT_PHOTO_REQUEST,
  EDIT_PROFILE_PHOTO_SUCCESS,
  EDIT_GROUP_PHOTO_SUCCESS,
  EDIT_PHOTO_FAILURE,
  DELETE_PHOTO_REQUEST,
  DELETE_PROFILE_PHOTO_SUCCESS,
  DELETE_GROUP_PHOTO_SUCCESS,
  DELETE_PHOTO_FAILURE,
} from './photos.types';

const INITIAL_PHOTO_STATE = {
  profilePhoto:'',
  groupPhoto:'',
  errors:{
    profilePhoto:'',
    groupPhoto:'',
  },
}

const photosReducer = (state = INITIAL_PHOTO_STATE, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO_REQUEST:
    case EDIT_PHOTO_REQUEST:
    case DELETE_PHOTO_REQUEST:
      return {
        ...state,
        errors: { ...state.errors, profilePhoto: '', groupPhoto: '' },
      };

    case UPLOAD_PROFILE_PHOTO_SUCCESS:
      return {
        ...state,
        profilePhoto: action.payload,
      };

    case UPLOAD_GROUP_PHOTO_SUCCESS:
      return {
        ...state,
        groupPhoto: action.payload,
      };

    case UPLOAD_PHOTO_FAILURE:
    case EDIT_PHOTO_FAILURE:
    case DELETE_PHOTO_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          profilePhoto: action.payload,
          groupPhoto: action.payload,
        },
      };
    
    case EDIT_PROFILE_PHOTO_SUCCESS:
      return {
        ...state,
        profilePhoto: action.payload,
      };
    case EDIT_GROUP_PHOTO_SUCCESS:
      return {
        ...state,
        groupPhoto: action.payload,
      };
    case DELETE_PROFILE_PHOTO_SUCCESS:
      return {
        ...state,
        profilePhoto: '',
      };
    case DELETE_GROUP_PHOTO_SUCCESS:
      return {
        ...state,
        groupPhoto: '',
      };
    default:
      return state;
  }
};

export default photosReducer;
