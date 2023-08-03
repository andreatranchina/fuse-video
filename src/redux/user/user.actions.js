import axios from "axios";
import { SET_USER, GET_USER, REMOVE_USER, EDIT_ACCOUNT, EDIT_STATUS, 
  EMAIL_FETCH_USER, ERROR_HANDLING, FETCH_USER_BY_ID, FETCH_FOLLOWERS, ADD_PROFILE_TO_VIEWS, 
  REMOVE_PROFILE_FROM_VIEWS, FETCH_FOLLOWINGS, INPUT_NEW_INFO, TOGGLE_LOGIN, TOGGLE_SIGNUP } from "./user.types";

export const setUser = (payload) => {
  return{
    type: SET_USER,
    payload: payload,
  }
}

export const getUser = (payload) => {
    return{
        type: GET_USER,
        payload: payload,
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
  };

  export const toggleLogin = () => {
    return {
      type: TOGGLE_LOGIN,
    }
  }

  export const toggleSignUp = () => {
    return {
      type: TOGGLE_SIGNUP
    }
  }

export const fetchUserById = (payload) => ({
  type: FETCH_USER_BY_ID,
  payload: payload
})

export const fetchUserByIdThunk = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`);
      dispatch(fetchUserById(res.data));
    } catch (error) {
      console.log(error)
    }
  }
}

export const errorHandling = () => (dispatch) => {
    dispatch({
      type: ERROR_HANDLING,
    });
};

export const editProfile = () => (dispatch) => {
    dispatch({
      type: EDIT_ACCOUNT,
    });
};

export const inputNewInfo = (payload) => (dispatch) => {
  dispatch({
    type: INPUT_NEW_INFO,
    payload: payload
  });
}

export const updateEditStatus = () => (dispatch) => {
  console.log('edit account')
    dispatch({
      type: EDIT_STATUS,
    });
};

export const editAccount = (payload) => ({
  type: EDIT_ACCOUNT,
  payload: payload,
});

export const editAccountThunk = (id, editedAccount) => {
  return async (dispatch) => {
    try {
    console.log('edit account thunk hit with country', editedAccount.country)
    const newAccountInfo = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`, {
      email: editedAccount.email,
      password: editedAccount.password,
      firstName: editedAccount.firstName,
      lastName: editedAccount.lastName,
      userName: editedAccount.userName,
      imgUrl: editedAccount.imgUrl,
      language: editedAccount.language,
      bio: editedAccount.bio,
      mobile: editedAccount.mobile,
      isDeactivated: editedAccount.isDeactivated,
      isPrivate: editedAccount.isPrivate,
      emailNotificiations: editedAccount.emailNotificiations,
      mobileNotifications: editedAccount.mobileNotifications,
      country: editedAccount.country,
      city: editedAccount.city,
      state: editedAccount.state,
    });
    console.log(editedAccount.country);
    console.log('made edit account axios call')
    dispatch(editAccount(newAccountInfo));
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchUserByEmail = (payload) => ({
  type: EMAIL_FETCH_USER,
  payload: payload,
});

export const fetchUserByEmailThunk = (userEmail) => {
  return async (dispatch) => {
    let user = {}
    try {
    console.log('email fetch thunk hit')
    user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/byEmail/${userEmail}`)
    console.log('made edit account axios call')
    dispatch(fetchUserByEmail(user.data));
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchFollowers = (payload) => ({
  type: FETCH_FOLLOWERS,
  payload: payload
})

//thunk for find all of the logged in user's followers
export const fetchFollowersThunk = (userId) => {
  return async(dispatch) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/follows/followers/${userId}`)
      console.log("user id in thunk " + userId);
      console.log("res in thunk: " + res.data);
      dispatch(fetchFollowers(res.data));
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchFollowings = (payload) => ({
  type: FETCH_FOLLOWINGS,
  payload: payload
})

//thunk for find all of the logged in user's followings
export const fetchFollowingsThunk = (userId) => {
  return async(dispatch) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/follows/followings/${userId}`)
      dispatch(fetchFollowings(res.data));
    } catch (error) {
      console.log(error)
    }
  }
}

export const addProfileToViews = (viewUser, mutualFollowers) => ({
  type: ADD_PROFILE_TO_VIEWS,
  payload: { viewUser, mutualFollowers }
})

//thunk to add a opened user profile to a list of opened profiles, allowing multiple user profile tabs to be opened to view

export const addProfileToViewsThunk = (viewUserId,loggedInUserId) => {
  return async(dispatch) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/viewProfile/${viewUserId}?loggedInUserId=${loggedInUserId}`);
      const { viewUser, viewUserFollowers, mutualFollowers, viewUserFollowersCount } = res.data;
      dispatch(addProfileToViews(viewUser, viewUserFollowers, mutualFollowers));
    } catch (error) {
      console.log(error)
    }
  }
}
//remove visiting profile data from the current view(s)
export const removeProfileFromViews = (viewUserId) => ({
  type: REMOVE_PROFILE_FROM_VIEWS,
  payload: viewUserId
})