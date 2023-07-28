import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../firebase/FirebaseAuthService";
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.defaultUser)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        await FirebaseAuthService.loginUser(email, password);
        // const response = await axios.get(`http://localhost:3001/api/user/byEmail/${email}`);
        // dispatch(setUser(response.data));
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
    // dispatch(setUser(null));
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
        const googleResponse = await FirebaseAuthService.loginWithGoogle();
        const email = googleResponse.user.email;
        // const response = await axios.get(`http://localhost:3001/api/user/byEmail/${email}`);
        // dispatch(setUser(response.data));
        navigate("/");
    }
    catch(error){
        alert(error.message);
    }
}  

  return (
    <div>
      <h1>Login Page</h1>
      {
        user ? (<div>
                <h3>Welcome, {user.firstName + " " + user.lastName}</h3>
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

