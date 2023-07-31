import React from 'react'
import { Box, Typography } from '@mui/material'

const SubSlogan = () => {
  return (
    <Box sx={{display:'flex', justifyContent:'center', width:'320px', transform: 'translateY(170px)', position: 'absolute', zIndex:3, alignItems:'center'}}>
        <Typography variant = 'h6' sx={{fontFamily:`'Kalam', cursive`, color:'black', textShadow: '0 0 12px white, 0 0 12px white, 0 0 12px white, 0 0 12px white'}}>
          Your Social Fusion Starts Here!
        </Typography>
        </Box>
  )
}

export default SubSlogan
