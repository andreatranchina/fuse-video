import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import '../../styles/navbar.css'
import { toggleLogin, toggleSignUp } from '../../redux/user/user.actions'

const UserLogin = () => {

  const dispatch = useDispatch();
  const isSigningUp = useSelector((state) => !!state.user.isSigningUp)
  const isLoggingIn = useSelector((state) => !!state.user.isLoggingIn)

  const handleOpenLogin = () => {
    dispatch(toggleLogin());
    if (isSigningUp) {
      dispatch(toggleSignUp()); //the user is not signing up
    }
  }

  const handleOpenSignUp = () => {
    dispatch(toggleSignUp());
    if (isLoggingIn){
      dispatch(toggleLogin()); //the user is not logging in
    }
  }

  return (
    <Box className="login-navlinks" >
        <NavLink className="login-navlink" to="/login" ><Box onClick={handleOpenLogin}>LOGIN</Box></NavLink>
        <NavLink  className="login-navlink"  to="/signup"><Box onClick={handleOpenSignUp}>SIGN UP</Box></NavLink>
    </Box>
  )
}

export default UserLogin
