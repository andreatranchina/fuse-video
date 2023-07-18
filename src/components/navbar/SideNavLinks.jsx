import React from 'react'
import { NavLink } from 'react-router-dom'
import '../.././styles/navbar.css'
import SwitchLayout from './SwitchLayout'
import { useThemeContext } from "../../theme/ThemeContextProvider"

const SideNavlinks = () => {

  const { theme } = useThemeContext();

    const navlink = {
    color: theme.palette.text.primary,
  };
  
  return (
    <div className='side-navlinks' style={{display:'flex', alignItems:'center'}}>
        <NavLink to="/join" style={navlink}>Join</NavLink>
        <NavLink to="/host" style={navlink}>Host</NavLink>
        <NavLink to="/translate" style={navlink}>Translate</NavLink>
        <NavLink to="/customize" style={navlink}>Customize</NavLink>
        <SwitchLayout/>
    </div>
  )
}

export default SideNavlinks