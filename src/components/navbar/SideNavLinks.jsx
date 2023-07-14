import React from 'react'
import { NavLink } from 'react-router-dom'
import '../.././styles/navbar.css'
import SwitchLayout from './SwitchLayout'

const SideNavlinks = () => {
  return (
    <div className='side-navlinks' style={{display:'flex', alignItems:'center'}}>
        <NavLink to="/join" className="navlink">Join</NavLink>
        <NavLink to="/host" className="navlink">Host</NavLink>
        <NavLink to="/translate" className="navlink">Translate</NavLink>
        <NavLink to="/customize" className="navlink">Customize</NavLink>
        <SwitchLayout/>
    </div>
  )
}

export default SideNavlinks