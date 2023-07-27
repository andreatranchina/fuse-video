import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../firebase/FirebaseAuthService";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.defaultUser);
  const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // setEmail(event.target.email.value);
  //   // setPassword(event.target.password.value);

  //   const isAdmin = false;

  //   dispatch(auth(email, password, "signup", isAdmin));
  //   navigate('/');
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        // await FirebaseAuthService.registerUser(username, password);
        await FirebaseAuthService.registerUser(email, password);
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
      <h1>Sign Up Page</h1>
      {/* <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email"
          value={email} required name="email"
          onChange={(e) => (setEmail(e.target.value))}
        />
        <input type="password" placeholder="password"
          value={password} required name="password"
          onChange={(e) => (setPassword(e.target.value))}
        />
        <button type="submit">Sign Up Now!</button>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="http://localhost:3001/auth/google">Continue with Google</a> */}

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
              <button type="submit">Sign Up</button>
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

export default SignUpPage