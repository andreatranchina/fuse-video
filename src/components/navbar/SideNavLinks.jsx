import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../.././styles/navbar.css'
import SwitchLayout from './SwitchLayout'
import { useThemeContext } from "../../theme/ThemeContextProvider"
import PersonIcon from '@mui/icons-material/Person'

const SideNavlinks = () => {
  const isLoggedIn = useSelector((state) => !!state.user.id);
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
        {isLoggedIn ? (<NavLink to='/profile' style={navlink}>
          <PersonIcon 
            sx={{width:'38px', height: '38px', marginRight: '20px'}}/>
          </NavLink>) : ('')}
        <SwitchLayout/>
    </div>
  )
}

export default SideNavlinks