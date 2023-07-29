import React from 'react'
import { Avatar, Box } from '@mui/material'
import WavyBackground from '../../assets/wavy-pattern.webp'

const MobileAvatarSlogan = () => {
  return (
    <Box>
        <Avatar variant='circle' src={WavyBackground} sx={{width: '180px',height:'180px',zIndex:2}}>
        </Avatar>
    </Box>
  )
}

export default MobileAvatarSlogan