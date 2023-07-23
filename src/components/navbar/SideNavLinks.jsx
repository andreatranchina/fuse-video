import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../.././styles/navbar.css'
import SwitchLayout from './SwitchLayout'
import { useThemeContext } from "../../theme/ThemeContextProvider"
import PersonIcon from '@mui/icons-material/Person'
import ProfileMenu from './ProfileMenu'

const SideNavlinks = () => {
  const isLoggedIn = useSelector((state) => !!state.user.id);
  const { theme } = useThemeContext();

    const navlink = {
    color: theme.palette.text.secondary,
  };
  
  return (
    <div className='side-navlinks' style={{display:'flex', alignItems:'center'}}>
        <NavLink to="/join" style={navlink}>Join</NavLink>
        <NavLink to="/host" style={navlink}>Host</NavLink>
        <NavLink to="/translate" style={navlink}>Translate</NavLink>
        <NavLink to="/customize" style={navlink}>Customize</NavLink>
        {isLoggedIn ? (<ProfileMenu/>) : ('')}
        <SwitchLayout/>
    </div>
  )
}

export default SideNavlinks