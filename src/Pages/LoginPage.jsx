import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, errorHandling } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../firebase/FirebaseAuthService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const errorHandle = useSelector((state) => state.user.error);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.defaultUser)
  const loginError = useSelector((state) => state.user.error)

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // // setEmail(event.target.email.value);
  //   // // setPassword(event.target.password.value);
  //   // // dispatch(fetchUserByEmailThunk(email))
  //   // try {
  //   dispatch(auth(email, password, "login"));
  //     // console.log('auth hit when it shouldn\'t have')
  //   // } catch (error) {
  //   //   console.log('error dispatch hit', loginError);
  //   //   navigate('/login');
  //   // }
  //   // navigate('/');
  //   // if (loginError) {
      
  //   // } else {
      
  // }

  // useEffect(() => {
  //     if (currentUser) {
  //     // User logged in successfully, redirect to dashboard home
  //     navigate('/');
  //   } else if (loginError) {
  //     // An error occurred during login, handle the error
  //     console.log('Login error:', loginError);
  //     navigate('/login');
  //   }
  //   },[currentUser, loginError, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        // await FirebaseAuthService.registerUser(username, password);
        await FirebaseAuthService.loginUser(email, password);
        setEmail("");
        setPassword("");
        navigate('/');
    }
    catch(error){
        alert(error.message);
    }
}

function handleLogout(){
    FirebaseAuthService.logoutUser();
}

const handleSendResetPasswordEmail = async () => {
    if(!email){
        alert("missing email");
        return;
    }

    try{
        await FirebaseAuthService.sendPasswordResetEmail(email);
        alert("sent the password reset email");
    }
    catch(error){
        alert(error.message);
    }
}

const handleLoginWithGoogle = async () => {
    try{
        await FirebaseAuthService.loginWithGoogle();

    }
    catch(error){
        alert(error.message);
    }
}  

  return (
    <div>
      <h1>Login Page</h1>
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
      {
        user ? (<div>
                <h3>Welcome, {user.email}</h3>
                <button type="button" onClick={handleLogout}>Logout</button>
              </div> )
        : (
          <form onSubmit = {handleSubmit}>
            <label>Email:
              <input type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}>                                 
              </input>
            </label>        
            <label>Password:
              <input type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}>
              </input>
            </label>
            <div>
              <button type="submit">Login</button>
              <button type="button" onClick = {handleSendResetPasswordEmail}>
                Reset password
              </button>
              <button type="button" onClick={handleLoginWithGoogle}>
                Login with google
              </button>
              <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        </form>
        )   
      }        
    </div>
  )
}

export default LoginPage

