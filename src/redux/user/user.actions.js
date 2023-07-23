import axios from "axios";

import { GET_USER, REMOVE_USER, EDIT_PROFILE } from "./user.types";

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
        } catch (dispatchOrHistoryErr) {
          console.error(dispatchOrHistoryErr);
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

export const editProfile = () => {
    return {
        type: EDIT_PROFILE,
    }
  };