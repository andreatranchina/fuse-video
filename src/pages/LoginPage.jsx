import React, { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from '@mui/material'
import { setUser } from "../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import FirebaseAuthService from "../firebase/FirebaseAuthService";
import { FormControl, TextField, createTheme, Button, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "../styles/loginPage.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useThemeContext } from "../theme/ThemeContextProvider";
import GoogleIcon from "../components/icons/GoogleIcon";
import GithubIcon from "../components/icons/GithubIcon";
import FacebookIcon from "../components/icons/FacebookIcon";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = () => {
  const isMobileScreen = useMediaQuery("(max-width: 414px");
  const isXtraSmallScreen = useMediaQuery("(max-width: 500px");
  const isSmallScreen = useMediaQuery("(max-width: 700px");
  const { mode } = useThemeContext();
  const loginTheme = createTheme({
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
        // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/byEmail/${email}`);
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
        // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/byEmail/${email}`);
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
      // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/byEmail/${email}`);
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
      // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/byEmail/${email}`);
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
    <ThemeProvider theme={loginTheme}>
    <div className="minipage-signup">
      <Box id={mode === 'light' ? 'signup-light' : 'signup-dark'} sx={{oveflow:'contain'}}>
      <Typography variant='h2' sx={{fontFamily:'Bungee Inline', transform:isXtraSmallScreen ? 'translateY(10px)' : isSmallScreen ? 'translateY(25px)' : 'translateY(40px)'}}>Login</Typography>
      {
        user ? (<div>
                <h3>Welcome, {user.email}</h3>
                <button type="button" onClick={handleLogout}>Logout</button>
              </div> )
        : (
          <Box sx={{transform: isXtraSmallScreen ? 'translateY(60px)' : isSmallScreen ? 'translateY(25px)' : 'translateY(50px)'}}>
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
              <div>
                <Button style= {{width: isMobileScreen ? '200px' : isXtraSmallScreen ? '280px' : isSmallScreen ? '300px' : ' ', marginTop: "10px", marginBottom: "10px" }} className="signup-button" type="submit"><Typography sx={{fontFamily:`'Bungee Hairline',cursive`, fontWeight:700, WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:'white'}}>Login</Typography></Button>
                {/* <Button style= {{margin: "10px" }} className="forgot-password-button" type="button" onClick = {handleSendResetPasswordEmail}>
                   <Typography sx={{fontFamily:`'Bungee Hairline',cursive`, fontWeight:700, 
                color:'#D97D54', WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor: mode === 'light'? 'var(--teal)' :'white'}}>Forgot Password?</Typography>
                </Button> */}
                <Button style= {{ width: isMobileScreen ? '200px' :  isXtraSmallScreen ? '280px' : isSmallScreen ? '300px' : ' ', margin: isSmallScreen ? '2px' : "10px"}} className="forgot-password-button-login"><Typography variant= {isXtraSmallScreen ? 'subtitle2' : ''}  sx={{fontFamily:`'Bungee Hairline',cursive`, fontWeight:700, WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:'color: rgb(88, 87, 165) !important', ':&hover': {
                  WebkitTextStrokeColor:'white',
                }}}>Forgot Password?</Typography></Button>
              </div>  

              <div className="third-party-buttons-container">
                <div class="google-btn inline-btn" onClick={handleLoginWithGoogle} sx={{transform:'translateY(-100px)'}}>
                 <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <GoogleIcon/>
                </Box>
                  <Typography sx={{ fontFamily:`'Roboto flex', sans-serif;`,fontWeight:700, fontSize:'16px', transform:'translate(20px,-30px)',zIndex:'3'}}>Login with Google</Typography>
                </div>

                <div class="google-btn inline-btn" onClick={handleLoginWithGithub}>
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <GithubIcon/>
                 </Box>
                   <Typography sx={{ fontFamily:`'Roboto flex', sans-serif;`,fontWeight:700, fontSize:'16px', transform:'translate(20px,-30px)',zIndex:'3'}}>Login with Github</Typography>
                </div>

                <div class="google-btn block-btn" onClick={handleLoginWithFacebook}>
                 <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <FacebookIcon/>
                 </Box>
                  <Typography sx={{ fontFamily:`'Roboto flex', sans-serif;`,fontWeight:700, fontSize:'16px', transform:'translate(20px,-30px)',zIndex:'3'}}>
                    Login with Facebook
                  </Typography>
                </div>
              </div>

            </div>      

        </FormControl>
        </Box>

        )   
      }     
      </Box> 
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

