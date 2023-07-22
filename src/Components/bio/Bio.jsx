import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider';

const Bio = () => {

  const { theme } = useThemeContext();

  const title = {
    fontFamily:`'Roboto mono', monospace`, 
  }

  const bio = {
    fontFamily:`'Roboto Flex', sans-serif`,
    fontWeight:200
  }

  return (
    <Box >
    <Typography variant='h5' sx={title}>
      OVERVIEW
    </Typography>
    <Divider sx={{width:'115px', height:'5px', marginBottom:'5px'}} />
    <Typography sx={bio}>
        I love watching movies, coding, and playing tennis. Western ny native. go bulldogs!
    </Typography>
    </Box>
  )
}

export default Bio