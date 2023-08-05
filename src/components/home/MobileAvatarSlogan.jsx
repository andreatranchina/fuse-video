import React from 'react'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import WavyBackground from '../../assets/wavy-pattern.webp'

const MobileAvatarSlogan = () => {
  return (
    <Box sx={{display:'flex', justifyContent:'center', transform:'translate(-250px,-120px)'}}>
    <Stack>
      <Avatar variant='circle' src={WavyBackground} sx={{width: '180px',height:'180px',alignItems:'center', position:'absolute'}}>
      </Avatar>
      
      <Box sx={{display:'flex', justifyContent:'center', width:'320px', position: 'absolute', zIndex:1, alignItems:'center', transform:'translateY(120px)'}}>
        <Typography variant = 'h6' sx={{fontFamily:`'Kalam', cursive`, fontWeight: 700, color:'black', textShadow: '0 0 12px white, 0 0 12px white, 0 0 12px white, 0 0 12px white'}}>
          Your Social Fusion Starts Here!
        </Typography>
      </Box>
      </Stack>
    </Box>
  )
}

export default MobileAvatarSlogan
