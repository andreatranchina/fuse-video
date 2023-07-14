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
          const res = await axios.get("http://localhost:8080/auth/me");
          dispatch(getUser(res.data || defaultUser));
        } catch (err) {
          console.error(err);
        }
    };
}

// export const auth = (email, password, method) => {
//     return async (dispatch) => {
//         let res;
//         //method can be login or signup
//         try {
//           res = await axios.post(`http://localhost:8080/auth/${method}`, {
//             email,
//             password,
//           });
//         } catch (authError) {
//           return dispatch(getUser({ error: authError }));
//         }
      
//         try {
//           dispatch(getUser(res.data));
//           // history.push("/home");
//         } catch (dispatchOrHistoryErr) {
//           console.error(dispatchOrHistoryErr);
//         }
//       };
// } 

export const logout = () => {
    return async (dispatch) => {
        try {
          await axios.post("http://localhost:8080/auth/logout");
          dispatch(removeUser());
        } catch (err) {
          console.error(err);
        }
      };
} 