import React from 'react'
import { Box } from "@mui/material"
import '../styles/home.css'
import FloatingMenu from '../components/navbar/FloatingMenu';
import MobileSpeedDial from '../components/navbar/MobileSpeedDial';
import { useThemeContext } from "../theme/ThemeContextProvider"
import { useMediaQuery } from '@mui/material'

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '../redux/user/user.actions';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => !!state.user.id);

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const { mode } = useThemeContext();
  const isSmallScreen = useMediaQuery("(max-width: 900px");

  return (
     <Box id={mode === 'light' ? 'home-light' : 'home-dark'} sx={{pt:10, justifyContent:'center', display:'flex'}}>
        Home
        {isLoggedIn? <h1>Successfully logged in!</h1> : <h1>Please signup or login!</h1>}
        <button style={{height: '29px'}}onClick={handleLogOut}>Logout</button>
        {isSmallScreen ? 
            <div style={{position: 'fixed', left: '50%', bottom: '20px', transform: 'translate(-50%, -20%)',  margin: '0 auto'}}>
                <FloatingMenu />
            </div> : <></>}
            {isSmallScreen ? 
            <div style={{position: 'fixed', left: '90%', bottom: '20px', margin: '0 auto'}}>
                <MobileSpeedDial/>
            </div> : <></>}
    </Box>
  )
}

export default Home