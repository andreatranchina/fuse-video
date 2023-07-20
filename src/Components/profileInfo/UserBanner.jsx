import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const UserBanner = () => {

  const { theme } = useThemeContext()

    const userName = {
        fontFamily:`'Bungee Hairline',monospace`, fontWeight:'700', marginTop:'18px',
        color: theme.palette.text.primary
      }
  return (
    <Box >
      <Typography variant='h4' sx={userName}>
          Username
      </Typography>
    </Box>
  )
}

export default UserBanner