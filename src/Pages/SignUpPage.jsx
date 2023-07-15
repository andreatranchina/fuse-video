import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // setEmail(event.target.email.value);
    // setPassword(event.target.password.value);
    const isAdmin = false;

    dispatch(auth(email, password, "signup", isAdmin));
    navigate('/');
  }

  return (
    <div>
      <h1>Sign Up Page</h1>
      <form onSubmit={handleSubmit}>
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
      <a href="http://localhost:8080/auth/google">Continue with Google</a>
    </div>
  )
}

export default SignUpPage