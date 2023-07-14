import React from 'react'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import TranslateIcon from '.././icons/TranslateIcon'
import JoinIcon from '.././icons/JoinIcon'
import HostIcon from '.././icons/HostIcon'
import CustomizeIcon from '.././icons/CustomizeIcon'
import { useThemeContext } from "../../theme/ThemeContextProvider"

const FloatingMenu = () => {

    const { theme } = useThemeContext();

    const floatingMenuStyle = {
    backgroundColor: theme.palette.background.fab,
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
        <HostIcon/>
      </Fab>
      </Tooltip>
    </NavLink>
    <NavLink to="/translate" className="navlink">
      <Tooltip title="Translate" placement="top">
      <Fab sx={floatingMenuStyle} aria-label="translate">
        <TranslateIcon/>
      </Fab>
      </Tooltip>
    </NavLink>
    <NavLink to="/customize" className="navlink">
      <Tooltip title="Customize" placement="top">
      <Fab sx={floatingMenuStyle} aria-label="customize">
        <CustomizeIcon/>
      </Fab>
      </Tooltip>
    </NavLink>
    </Box>
  )
}

export default FloatingMenu