import React from 'react'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import TranslateIcon from '../icons/ExploreIcon'
import JoinIcon from '../icons/JoinIcon'
import HostIcon from '../icons/HostIcon'
import ProfileIcon from '../icons/ProfileIcon'
import { useThemeContext } from "../../theme/ThemeContextProvider"

const FloatingMenu = () => {

    const { theme } = useThemeContext();

    const floatingMenuStyle = {
    backgroundColor: theme.palette.background.fab.default,
  };
  return (
    <Box sx={{ '& > :not(style)': { m: 1 }, display:'flex', alignItems:'center' }}>
    <NavLink to="/join" className="navlink">
      <Tooltip title="Join" placement="top">
        <Fab sx={floatingMenuStyle} aria-label="join">
        <JoinIcon />
        </Fab>
      </Tooltip>
    </NavLink>
    <NavLink to="/host" className="navlink">
      <Tooltip title="Host" placement="top">
      <Fab sx={floatingMenuStyle} aria-label="host">
        <HostIcon width={'38px'} height={'38px'} />
      </Fab>
      </Tooltip>
    </NavLink>
    <NavLink to="/explore" className="navlink">
      <Tooltip title="Explore" placement="top">
      <Fab sx={floatingMenuStyle} aria-label="translate">
        <TranslateIcon/>
      </Fab>
      </Tooltip>
    </NavLink>
    <NavLink to="/profile" className="navlink">
      <Tooltip title="Profile" placement="top">
      <Fab sx={floatingMenuStyle} aria-label="profile">
        <ProfileIcon/>
      </Fab>
      </Tooltip>
    </NavLink>
    </Box>
  )
}

export default FloatingMenu