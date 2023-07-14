import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/navbar.css'

const UserLogin = () => {
  return (
    <div className="login-navlinks">
        <NavLink className="login-navlink" to="/login" >LOGIN</NavLink>
        <NavLink  className="login-navlink"  to="/signup">SIGN UP</NavLink>
    </div>
  )
}

export default UserLogin