import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const UserLocation = () => {

     const { theme } = useThemeContext();

  const location = {
    color: theme.palette.text.primary,
    fontFamily: `'Roboto Mono', monospace`
  }

  return (
    <Box sx={{display:'flex', justifyContent: 'center'}}>
      <Typography variant='subtitle1' sx={location}>
          Denver, CO
      </Typography>
    </Box>
  )
}

export default UserLocation