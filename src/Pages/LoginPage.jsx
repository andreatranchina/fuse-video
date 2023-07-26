import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, errorHandling } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const errorHandle = useSelector((state) => state.user.error);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.defaultUser)
  const loginError = useSelector((state) => state.user.error)

  const handleSubmit = (event) => {
    event.preventDefault();
    // // setEmail(event.target.email.value);
    // // setPassword(event.target.password.value);
    // // dispatch(fetchUserByEmailThunk(email))
    // try {
    dispatch(auth(email, password, "login"));
      // console.log('auth hit when it shouldn\'t have')
    // } catch (error) {
    //   console.log('error dispatch hit', loginError);
    //   navigate('/login');
    // }
    // navigate('/');
    // if (loginError) {
      
    // } else {
      
  }
  useEffect(() => {
      if (currentUser) {
      // User logged in successfully, redirect to dashboard home
      navigate('/');
    } else if (loginError) {
      // An error occurred during login, handle the error
      console.log('Login error:', loginError);
      navigate('/login');
    }
    },[currentUser, loginError, navigate])

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email"
          value={email} required name="email"
          onChange={(e) => (setEmail(e.target.value))}
        />
        <input type="password" placeholder="password"
          value={password} required name="password"
          onChange={(e) => (setPassword(e.target.value))}
        />
        <button type="submit">Login!</button>
        {errorHandle && errorHandle.response && <div> {errorHandle.response.data} </div>}
      </form>
    </div>
  )
}

export default LoginPage

