import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../firebase/FirebaseAuthService";
import axios from 'axios';
import { setUser } from "../redux/user/user.actions";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.defaultUser);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        // await FirebaseAuthService.registerUser(username, password);
        const newUser = await FirebaseAuthService.registerUser(email, password);

        const response = await axios.post("http://localhost:3001/api/user", {
          email: newUser.user.email,
          imgUrl: newUser.user.photoURL,
          firstName: firstName,
          lastName: lastName,
        })
        dispatch(setUser(response.data));
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
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
        const newUser = await FirebaseAuthService.loginWithGoogle();

        const nameArray = newUser.user.displayName.split(" ");
        console.log(newUser.user.displayName);
        console.log(nameArray);
 
        const response = await axios.post("http://localhost:3001/api/user", {
          email: newUser.user.email,
          imgUrl: newUser.user.photoURL,
          firstName: nameArray[0],
          lastName: nameArray[1],
        })
        dispatch(setUser(response.data));

        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        navigate('/');

    }
    catch(error){
        alert(error.message);
    }
}  

  return (
    <div>
      <h1>Sign Up Page</h1>
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
            <label>First Name:
              <input type="text" required value={firstName}
                onChange={(e) => setFirstName(e.target.value)}>
              </input>
            </label>
            <label>Last Name:
              <input type="text" required value={lastName}
                onChange={(e) => setLastName(e.target.value)}>
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