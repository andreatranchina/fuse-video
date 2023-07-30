import React, { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../firebase/FirebaseAuthService";
import axios from 'axios';
import { FormControl, TextField, createTheme, Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "../styles/loginPage.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = () => {
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            // '& input' : {
            //   color: 'black',
            // },
            '& placeholder': {
              color: 'black',
            },
            '& .MuiOutlinedInput-root': {
              // backgroundColor: 'white',
              '& fieldset': {
                borderColor: 'var(--teal)',
                boxShadow: 'rgba(58, 115, 144, 0.2) 0 -25px 18px -14px inset,rgba(49, 126, 138, 0.15) 0 1px 2px,rgba(45, 114, 148, 0.15) 0 2px 4px,rgba(44, 106, 187, 0.15) 0 4px 8px,rgba(44, 137, 187, 0.15) 0 8px 16px,rgba(44, 139, 187, 0.15) 0 16px 32px',
                margin: '7px auto',
                border: '3px solid white',
                },
              '&:hover fieldset': {
                borderWidth: '0.15rem',
                borderColor: 'var(--teal)',
              },
            },
          },
        },
      },
        MuiInputLabel: {
          styleOverrides: {
          // root: {
            color: "white",
          // },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            textTransform: 'initial',
            fontSize: '0.7rem',
            color: 'black', 
          },
        },
      },
     },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.defaultUser)

  const handleOpenSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);
  };

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
      setSnackbarSeverity("error");
      setSnackbarMessage(error.message);
      handleOpenSnackbar();
    }
}

function handleLogout(){
    FirebaseAuthService.logoutUser();
    // dispatch(setUser(null));
}

const handleSendResetPasswordEmail = async () => {
    if(!email){
      setSnackbarSeverity("error");
      setSnackbarMessage("Enter your email to receive a password reset email");
      handleOpenSnackbar();
      return;
    }

    try{
        await FirebaseAuthService.sendPasswordResetEmail(email);
        setSnackbarSeverity("success");
        setSnackbarMessage("Sent the password reset email");
        handleOpenSnackbar();
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
      setSnackbarSeverity("error");
      setSnackbarMessage(error.message);
      handleOpenSnackbar();
    }
}  

const handleLoginWithGithub = async () => {
  try{
      const googleResponse = await FirebaseAuthService.loginWithGithub();
      const email = googleResponse.user.email;
      // const response = await axios.get(`http://localhost:3001/api/user/byEmail/${email}`);
      // dispatch(setUser(response.data));
      navigate("/");
  }
  catch(error){
    setSnackbarSeverity("error");
    setSnackbarMessage(error.message);
    handleOpenSnackbar();
  }
}  

const handleLoginWithFacebook = async () => {
  try{
      const googleResponse = await FirebaseAuthService.loginWithFacebook();
      const email = googleResponse.user.email;
      // const response = await axios.get(`http://localhost:3001/api/user/byEmail/${email}`);
      // dispatch(setUser(response.data));
      navigate("/");
  }
  catch(error){
    setSnackbarSeverity("error");
    setSnackbarMessage(error.message);
    handleOpenSnackbar();
  }
}  

  return (
    <ThemeProvider theme={theme}>
    <div className="minipage-signup">
      <h1>Login Page</h1>
      {
        user ? (<div>
                <h3>Welcome, {user.email}</h3>
                <button type="button" onClick={handleLogout}>Logout</button>
              </div> )
        : (
          <FormControl component="form" onKeyDown = {(e) => {return e.target==="enter"? handleSubmit: null}} onSubmit = {handleSubmit} id="signup-form">
                <TextField id="signup-form-email" sx={{ input: { color: 'var(--teal)' } }} type="email" required value={email}
                  label = "Email" placeholder = "Email"
                  InputLabelProps={{className: "textfield-label"}}
                  onChange={(e) => setEmail(e.target.value)}>                                 
                </TextField>       
                <TextField type="password" required value={password}
                  InputLabelProps={{className: "textfield-label"}}
                  label = "Password" placeholder = "Password"
                  onChange={(e) => setPassword(e.target.value)}>
                </TextField>

            <div>
              <div className="first-party-buttons-container">
                <Button style= {{margin: "4px" }} className="signup-button" type="submit">Login</Button>
                <Button style= {{margin: "4px" }} className="forgot-password-button" type="button" onClick = {handleSendResetPasswordEmail}>
                  Forgot Password?
                </Button>
              </div>  

              <div className="third-party-buttons-container">
                <div class="google-btn inline-btn" onClick={handleLoginWithGoogle}>
                  <div class="google-icon-wrapper">
                    <img alt="google logo" class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                  </div>
                  <p class="btn-text"><b>Login with Google</b></p>
                </div>

                <div class="google-btn inline-btn" onClick={handleLoginWithGithub}>
                  <div class="google-icon-wrapper">
                    <img alt="github logo" class="google-icon" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"/>
                  </div>
                  <p class="btn-text"><b>Login with Github</b></p>
                </div>

                <div class="google-btn block-btn" onClick={handleLoginWithFacebook}>
                  <div class="google-icon-wrapper">
                    <img alt= "facebook-logo" style= {{width: "2rem" }} class="google-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEy4H82v_a3m8Ru9_Z8T77TWt9JUR_M8eTxA&usqp=CAU"/>
                  </div>
                  <p class="btn-text"><b>Login with Facebook</b></p>
                </div>
              </div>

            </div>      

        </FormControl>

        )   
      }      
    </div>
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>


    </ThemeProvider>

  )
}

export default LoginPage

