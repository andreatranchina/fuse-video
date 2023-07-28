import React, { useEffect } from 'react'
import { Box } from "@mui/material"
import '../styles/home.css'
import FloatingMenu from '../components/navbar/FloatingMenu';
import MobileSpeedDial from '../components/navbar/MobileSpeedDial';
import { useThemeContext } from "../theme/ThemeContextProvider"
import { useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from '../redux/user/user.actions';
import FirebaseAuthService from '../firebase/FirebaseAuthService';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.defaultUser);

  const handleLogout = (e) => {
    e.preventDefault();
    FirebaseAuthService.logoutUser();
    dispatch(setUser(null));

    navigate("/");
  };

  const { mode } = useThemeContext();
  const isSmallScreen = useMediaQuery("(max-width: 900px");

  return (
     <Box id={mode === 'light' ? 'home-light' : 'home-dark'} sx={{pt:10, justifyContent:'center', display:'flex'}}>
        Home
        {user? <h1>Welcome, {user.firstName + " " + user.lastName}</h1> : <h1>Please signup or login!</h1>}
        <button style={{height:'30px'}} onClick={handleLogout}>Logout</button>
        {isSmallScreen ? 
            <div style={{position: 'fixed', left: '50%', bottom: '20px', transform: 'translate(-50%, -20%)',  margin: '0 auto'}}>
                <FloatingMenu />
            </div> : <></>}
    </Box>
  )
}

export default Home