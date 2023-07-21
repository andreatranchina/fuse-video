import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // setEmail(event.target.email.value);
    // setPassword(event.target.password.value);

    dispatch(auth(email, password, "login"));
    setEmail("");
    setPassword("");
    navigate('/');
  }

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
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

export default LoginPage