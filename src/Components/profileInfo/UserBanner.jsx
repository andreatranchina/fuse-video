import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const UserBanner = () => {

    const userName = {
        fontFamily:`'Bungee Hairline',monospace`, fontWeight:'700', marginTop:'18px'
    }
  return (
    <Box sx={{backgroundColor:'teal'}}>
      <Typography variant='h4' sx={userName}>
          Username
      </Typography>
    </Box>
  )
}

export default UserBanner