import React from 'react'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import FuseIcon from '../icons/FuseIcon'
import TranslateIcon from '../icons/TranslateIcon'
import JoinIcon from '../icons/JoinIcon'
import HostIcon from '../icons/HostIcon'
import CustomizeIcon from '../icons/CustomizeIcon'
import { useThemeContext } from "../../theme/ThemeContextProvider"

const MobileSpeedDial = () => {

const { theme } = useThemeContext();

const actionSpeedDial = {
    backgroundColor: theme.palette.background.fab.default,
    '&:hover': {
      backgroundColor: theme.palette.background.fab.hover 
    },
}

const speedDial = {
  position: 'absolute', bottom: 16, right: 16,
}

const iconStyle = {
    transform: 'scale(0.7)',
}

const actions = [
  { icon:  <div style={iconStyle}><NavLink to="/host" className="navlink"><HostIcon width={'38px'} height={'38px'} /></NavLink></div>, name: 'Host' },
  { icon: <div style={iconStyle}><NavLink to="/join" className="navlink"><JoinIcon /></NavLink></div>, name: 'Join' },
  { icon: <div style={iconStyle}><TranslateIcon /></div>, name: 'Discover' },
  { icon: <div style={iconStyle}><CustomizeIcon /></div>, name: 'Profile' },
];

  return (
     <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={<FuseIcon sx={speedDial}/>}
        FabProps={{
          sx:{backgroundColor: theme.palette.background.fab.default,
    '&:hover': {
      backgroundColor: theme.palette.background.fab.hover 
        }},}}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            FabProps={{
              sx:{backgroundColor: theme.palette.background.fab.default,
    '&:hover': {
      backgroundColor: theme.palette.background.fab.hover 
    },}
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}

export default MobileSpeedDial