import axios from "axios";

import { GET_USER, REMOVE_USER } from "./user.types";

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
      console.log("running auth thunk");
        let res;
        //method can be login or signup
        try {
          res = await axios.post(`http://localhost:3001/auth/${method}`, {
            email,
            password,
            isAdmin,
          });
          console.log("res from /auth/signup: " + res);
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
      console.log("running logout thunk");
        try {
          await axios.post("http://localhost:3001/auth/logout");
          console.log("came back from axios logout")
          return dispatch(removeUser());
        } catch (err) {
          console.error(err);
        }
      };
} 