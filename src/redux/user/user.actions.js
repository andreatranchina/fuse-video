import axios from "axios";

import { GET_USER, REMOVE_USER, EDIT_ACCOUNT, EDIT_STATUS } from "./user.types";

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

  // email:{
  //           type: DataTypes.STRING,
  //           unique: true,
  //           allowNull: false,
  //           validate: {
  //               isEmail: true,
  //           }
  //       },
  //       password: {
  //           type: DataTypes.STRING,
  //       },
  //       firstName: {
  //           type: DataTypes.STRING,
  //           defaultValue: 'Jenny',
  //           allowNull: false,
  //       },
  //       lastName: {
  //           type: DataTypes.STRING,
  //           defaultValue: 'Craig',
  //           allowNull: false,
  //       },
  //       userName: {
  //           type: DataTypes.STRING,
  //           defaultValue:'sleekusername91',
  //           allowNull: false,
  //       },
  //       imgUrl: {
  //           type: DataTypes.STRING(1000),
  //           defaultValue: "https://i0.wp.com/cfe.umich.edu/wp-content/uploads/2015/09/blank-profile.jpg?fit=4016%2C2677&ssl=1",
  //       },
  //       salt: { //salt is needed to run the encryption again, each user will have unique salt
  //           type: DataTypes.STRING
  //       },
  //       googleId: { //for OAuth
  //           type: DataTypes.STRING,
  //       },
  //       isAdmin: {
  //           type: DataTypes.BOOLEAN,
  //           allowNull: false,
  //           defaultValue: false,
  //       },
  //       language:{
  //           type: DataTypes.STRING,
  //           allowNull: false,
  //           defaultValue: 'EN',
  //       },
  //       bio: {
  //           type: DataTypes.STRING(100),
  //           defaultValue:'I love tennis, movies, music, and more! Let\'s connect!'
  //       },
  //       mobile: {
  //           type:DataTypes.STRING(100),
  //           defaultValue:'+18009092929'
  //       },
  //       isDeactivated: {
  //           type: DataTypes.BOOLEAN,
  //           defaultValue:false
  //       },
  //       isPrivate: {
  //           type: DataTypes.BOOLEAN,
  //           defaultValue:false
  //       },
  //       emailNotifications:{
  //           type: DataTypes.BOOLEAN,
  //           defaultValue:true
  //       },
  //       mobileNotifications:{
  //           type: DataTypes.BOOLEAN,
  //           defaultValue:true
  //       },
  //       country:{
  //           type: DataTypes.STRING(100),
  //           defaultValue: 'United States'
  //       },
  //       city:{
  //           type: DataTypes.STRING(100),
  //           defaultValue: 'Denver'
  //       },
  //       state:{
  //           type: DataTypes.STRING(100),
  //           defaultValue: 'CO'
  //       },
  //   },


