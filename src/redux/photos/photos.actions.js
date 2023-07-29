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

// Assuming you have your API or server calls in separate functions like uploadPhoto, editPhoto, and deletePhoto

// Upload Profile Photo Thunk
export const uploadProfilePhoto = (photo) => async (dispatch) => {
  dispatch({ type: UPLOAD_PHOTO_REQUEST });

  try {
    const uploadedPhoto = await uploadPhoto(photo); // Replace this with your API call
    dispatch({ type: UPLOAD_PROFILE_PHOTO_SUCCESS, payload: uploadedPhoto });
  } catch (error) {
    dispatch({ type: UPLOAD_PHOTO_FAILURE, payload: error.message });
  }
};

// Upload Group Photo Thunk
export const uploadGroupPhoto = (photo) => async (dispatch) => {
  dispatch({ type: UPLOAD_PHOTO_REQUEST });

  try {
    const uploadedPhoto = await uploadPhoto(photo); // Replace this with your API call
    dispatch({ type: UPLOAD_GROUP_PHOTO_SUCCESS, payload: uploadedPhoto });
  } catch (error) {
    dispatch({ type: UPLOAD_PHOTO_FAILURE, payload: error.message });
  }
};

// Edit Profile Photo Thunk
export const editProfilePhoto = (photo) => async (dispatch) => {
  dispatch({ type: EDIT_PHOTO_REQUEST });

  try {
    const editedPhoto = await editPhoto(photo); // Replace this with your API call
    dispatch({ type: EDIT_PROFILE_PHOTO_SUCCESS, payload: editedPhoto });
  } catch (error) {
    dispatch({ type: EDIT_PHOTO_FAILURE, payload: error.message });
  }
};

// Edit Group Photo Thunk
export const editGroupPhoto = (photo) => async (dispatch) => {
  dispatch({ type: EDIT_PHOTO_REQUEST });

  try {
    const editedPhoto = await editPhoto(photo); // Replace this with your API call
    dispatch({ type: EDIT_GROUP_PHOTO_SUCCESS, payload: editedPhoto });
  } catch (error) {
    dispatch({ type: EDIT_PHOTO_FAILURE, payload: error.message });
  }
};

export const deleteProfilePhoto = () => async (dispatch) => {
  const photoType = 'profilePhoto';
  dispatch({ type: DELETE_PHOTO_REQUEST });

  try {
    await deletePhoto(); // Replace this with your API call
    dispatch({ type: DELETE_PROFILE_PHOTO_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_PHOTO_FAILURE, payload: { photoType, error: error.message } });
  }
};

// Delete Group Photo Thunk
export const deleteGroupPhoto = () => async (dispatch) => {
  const photoType = 'groupPhoto';
  dispatch({ type: DELETE_PHOTO_REQUEST });

  try {
    await deletePhoto(); // Replace this with your API call
    dispatch({ type: DELETE_GROUP_PHOTO_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_PHOTO_FAILURE, payload: { photoType, error: error.message } });
  }
};

