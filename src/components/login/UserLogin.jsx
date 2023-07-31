import React from 'react'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import '../../styles/navbar.css'

const UserLogin = () => {
  return (
    <Box className="login-navlinks" >
        <NavLink className="login-navlink" to="/login" >LOGIN</NavLink>
        <NavLink  className="login-navlink"  to="/signup">SIGN UP</NavLink>
    </Box>
  )
}

export default UserLogin
