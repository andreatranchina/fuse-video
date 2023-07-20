import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const Followers = () => {

  const { theme } = useThemeContext();

  const followers = {
    color: theme.palette.text.primary,
    fontFamily: `'Roboto Condensed', sans-serif`
  }

  return (
    <Box sx={{display:'flex', justifyContent: 'center'}}>
      <Typography variant='subtitle2' sx={followers}>
        25.2K followers
      </Typography>
    </Box>
  )
}

export default Followers