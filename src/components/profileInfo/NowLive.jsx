import React from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import { useMediaQuery } from '@mui/material'

const NowLive = () => {

  const { theme } = useThemeContext();
  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const nowLive = {
    backgroundColor: 'white', width:'36px', height:'24px', 
    transform: isSmallScreen ? ('translate(-4px,27px)') : ('translate(40px,34px)'), border:'3px solid red'
  }

  return (
    <Box >
      <Fab sx={nowLive}>
      <Typography variant='caption' display='block'>
        Live
        </Typography>
      </Fab>
    </Box>
  )
}

export default NowLive
