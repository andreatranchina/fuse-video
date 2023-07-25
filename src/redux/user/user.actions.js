import axios from "axios";

import { GET_USER, REMOVE_USER, EDIT_ACCOUNT, EDIT_STATUS, EMAIL_FETCH_USER } from "./user.types";

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

//THUNKS
export const me = () => {
    return async (dispatch) => {
        try {
          const res = await axios.get("http://localhost:3001/auth/me");
          // dispatch(getUser(res.data || defaultUser));
          dispatch(getUser(res.data));
        } catch (err) {
          console.error(err);
        }
    };
}

export const auth = (email, password, method, isAdmin) => {
    return async (dispatch) => {
        let res;
        //method can be login or signup
        try {
          res = await axios.post(`http://localhost:3001/auth/${method}`, {
            email,
            password,
            isAdmin,
          });
        } catch (authError) {
          return dispatch(getUser({ error: authError }));
        }
      
        try {
          dispatch(getUser(res.data));
          // history.push("/home");
          dispatch(fetchUserByEmailThunk(email));
          // return Promise.resolve();
        } catch (dispatchOrHistoryErr) {
          console.error(dispatchOrHistoryErr + " it didn't work");
          // return Promise.reject()
        }
      };
} 

export const logout = () => {
    return async (dispatch) => {
        try {
          await axios.post("http://localhost:3001/auth/logout");
          console.log("came back from axios logout")
          return dispatch(removeUser());
        } catch (err) {
          console.error(err);
        }
      };
} 

export const editProfile = () => (dispatch) => {
    dispatch({
      type: EDIT_ACCOUNT,
    });
};

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
    console.log('edit account thunk hit')
    const newAccountInfo = await axios.put(`http://localhost:3001/api/user/${id}`, {
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
    user = await axios.get(`http://localhost:3001/api/user/byEmail/${userEmail}`, {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      imgUrl: user.imgUrl,
      language: user.language,
      bio: user.bio,
      mobile: user.mobile,
      isDeactivated: user.isDeactivated,
      isPrivate: user.isPrivate,
      emailNotificiations: user.emailNotificiations,
      mobileNotifications: user.mobileNotifications,
      country: user.country,
      city: user.city,
      state: user.state,
    });
    console.log('made edit account axios call')
    dispatch(fetchUserByEmail(user.data));
    } catch (error) {
      console.log(error)
    }
  }
}