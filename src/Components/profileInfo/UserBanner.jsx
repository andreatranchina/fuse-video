import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import { useMediaQuery } from '@mui/material'

const UserBanner = () => {

  const { theme } = useThemeContext()
  const isSmallScreen = useMediaQuery('(max-width: 900px)');

    const userName = {
        fontFamily:`'Bungee Hairline',monospace`, fontWeight:'700', marginTop:'18px',
        color: theme.palette.text.primary
      }
  return (
    <Box >
      <Typography variant={isSmallScreen ? ('h5') : ('h4')} sx={userName}>
          Username
      </Typography>
    </Box>
  )
}

export default UserBanner