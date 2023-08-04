import React, {useState, forwardRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box'
import FirebaseAuthService from "../firebase/FirebaseAuthService";
import axios from 'axios';
import { setUser } from "../redux/user/user.actions";
import { Button, createTheme,Typography, FormControl, TextField, useMediaQuery} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "../styles/signupPage.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import GoogleIcon from "../components/icons/GoogleIcon";
import GithubIcon from "../components/icons/GithubIcon";
import FacebookIcon from "../components/icons/FacebookIcon";
import { useThemeContext } from "../theme/ThemeContextProvider";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUpPage = () => {
  const isXtraSmallScreen = useMediaQuery("(max-width: 500px");
  const isSmallScreen = useMediaQuery("(max-width: 700px");
  const isMediumScreen = useMediaQuery("(max-width: 920px");
  const { mode } = useThemeContext();

  const signUpTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& placeholder': {
              color: 'black',
            },
            '& .MuiOutlinedInput-root': {
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
            color: "white",
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");


  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.defaultUser);
  const navigate = useNavigate();

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
        const newUser = await FirebaseAuthService.registerUser(email, password);

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
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
      setSnackbarSeverity("error");
      setSnackbarMessage(error.message);
      handleOpenSnackbar();
    }
}

function handleLogout(){
    FirebaseAuthService.logoutUser();
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

const handleRegisterWithGoogle = async () => {
    try{
        const newUser = await FirebaseAuthService.loginWithGoogle();

        const nameArray = newUser.user.displayName.split(" ");
        console.log(newUser.user.displayName);
        console.log(nameArray);
 
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
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
      setSnackbarSeverity("error");
      setSnackbarMessage(error.message);
      handleOpenSnackbar();
    }
}  

const handleRegisterWithGithub = async () => {
  try{
      const newUser = await FirebaseAuthService.loginWithGithub();

      const nameArray = newUser.user.displayName.split(" ");
      console.log(newUser.user.displayName);
      console.log(nameArray);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
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
    setSnackbarSeverity("error");
    setSnackbarMessage(error.message);
    handleOpenSnackbar();
  }
}  

const handleRegisterWithFacebook = async () => {
  try{
      const newUser = await FirebaseAuthService.loginWithFacebook();

      const nameArray = newUser.user.displayName.split(" ");
      console.log(newUser.user.displayName);
      console.log(nameArray);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
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
    setSnackbarSeverity("error");
    setSnackbarMessage(error.message);
    handleOpenSnackbar();
  }
}  

  return (
    <ThemeProvider theme={signUpTheme}>
    
    <div className="minipage-signup" >
    <Box id={mode === 'light' ? 'signup-light' : 'signup-dark'} sx={{oveflow:'contain'}}>
      <Typography variant={isSmallScreen ? ('h3') : ('h2')} sx={{fontFamily:'Bungee Inline', transform:isXtraSmallScreen ? 'translateY(10px)' : isSmallScreen ? 'translateY(25px)' : 'translateY(40px)'}}>Sign Up</Typography>
      {
        user ? (<div>
                <h3>Welcome, {user.email}</h3>
                <button type="button" onClick={handleLogout}>Logout</button>
              </div> )
        : (
          <Box sx={{transform: isXtraSmallScreen ? 'translateY(60px)' : isSmallScreen ? 'translateY(25px)' : 'translateY(50px)'}}>
          <FormControl component="form" onKeyDown = {(e) => {return e.target==="enter"? handleSubmit: null}} onSubmit = {handleSubmit} id="signup-form">
                <TextField className="input-1" id="signup-form-email" sx={{ input: { color: 'var(--teal)' } }} type="email" required value={email}
                  label = "Email" placeholder = "Email"
                  InputLabelProps={{className: "textfield-label"}}
                  onChange={(e) => setEmail(e.target.value)}>                                 
                </TextField>       
                <TextField className="input-2" type="password" required value={password}
                  InputLabelProps={{className: "textfield-label"}} sx={{ input: { color: 'var(--teal)' } }}
                  label = "Password" placeholder = "Password"
                  onChange={(e) => setPassword(e.target.value)}>
                </TextField>
                <TextField className="input-3" type="text" required value={firstName}
                  InputLabelProps={{className: "textfield-label"}} sx={{ input: { color: 'var(--teal)' } }}                
                  label = "First Name" placeholder = "First Name"    
                  onChange={(e) => setFirstName(e.target.value)}>
                </TextField>
                <TextField className="input-4" type="text" required value={lastName}
                  InputLabelProps={{className: "textfield-label"}} sx={{ input: { color: 'var(--teal)' } }}                
                  label = "Last Name" placeholder = "Last Name"                
                  onChange={(e) => setLastName(e.target.value)}>
                </TextField>

            <div>

              <Button style= {{marginBottom: isSmallScreen ? '-1px' : "4px"}} className="signup-button" type="submit" ><Typography sx={{fontFamily:`'Bungee Hairline',cursive`, fontWeight:700, WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:'white' }}>Sign Up</Typography></Button>
              <div className='third-party-buttons-container'>
                <div class="google-btn inline-btn" onClick={handleRegisterWithGoogle} sx={{transform:'translateY(-100px)'}}>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <GoogleIcon/>
                </Box>
                  <Typography sx={{ fontFamily:`'Roboto flex', sans-serif;`,fontWeight:700, fontSize: isSmallScreen ? '14px' : '16px', transform: 'translate(20px,-30px)',zIndex:'3'}}>Register with Google</Typography>
          </div>
          {isSmallScreen}
                <div class="google-btn inline-btn" onClick={handleRegisterWithGithub}>
                 <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <GithubIcon/>
                 </Box>
                   <Typography sx={{ fontFamily:`'Roboto flex', sans-serif;`,fontWeight:700, fontSize: isSmallScreen ? '14px' : '16px', transform:'translate(20px,-30px)',zIndex:'3'}}>Register with Github</Typography>
                </div>

                <div class="google-btn inline-btn" onClick={handleRegisterWithFacebook}style={{transform: isSmallScreen ? 'translateY(0px)' : isMediumScreen ? 'translateY(-20px)' : ''}}>
                 <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <FacebookIcon/>
                 </Box>
                  <Typography sx={{ fontFamily:`'Roboto flex', sans-serif`,fontWeight:700, fontSize: isSmallScreen ? '14px' : '16px', transform: 'translate(20px,-30px)', zIndex:'3'}}>
                    Register with Facebook
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

export default SignUpPage
