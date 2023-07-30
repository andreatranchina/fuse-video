import React from 'react'
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import StreamParty from './StreamParty'
import WavyBackground from '../../assets/wavy-pattern.webp'

const HomeImagesContainer = () => {

  const isSmallScreen = useMediaQuery('(max-width: 900px');
  const isXtraSmallScreen = useMediaQuery('(max-width: 700px)');
  const isMobileScreen = useMediaQuery('(max-width: 420px)');
  const user = useSelector((state) => state.user.defaultUser);

  return (
    <Box sx={{display: isMobileScreen ? 'flex' : '', justifyContent: isMobileScreen ? 'center' : '', marginTop:user? '40px' : ''}}>
     <Avatar variant='circle' src={WavyBackground} sx={{width:isMobileScreen ? '' : isSmallScreen ? '150px' : '220px', height:isMobileScreen ? '' : isSmallScreen ? '150px' : '220px', transform:isMobileScreen ? '' : isXtraSmallScreen ? 'translate(-80px,30px)' : isSmallScreen ? 'translate(-330px,30px)' : 'translate(-150px,30px)',zIndex:2}}>
			</Avatar>
      <Box sx={{width:'400px', transform: isMobileScreen ? '' : isXtraSmallScreen ? 'translate(-55px,-95px)': isSmallScreen ? 'translate(-305px,-95px)' : 'translate(-125px,-140px)', position: 'absolute', zIndex:3}}>
        <Typography variant={isMobileScreen ? 'caption' : isSmallScreen ? 'h6' : 'h4'} sx={{fontFamily:`'Kalam', cursive`, color:'black', textShadow: '0 0 12px white, 0 0 12px white, 0 0 12px white, 0 0 12px white'}}>
          Your Social <Typography variant={isMobileScreen ? 'caption' : isSmallScreen ? 'h6' : 'h4'} sx={{fontFamily:`'Bungee Inline', cursive`, marginLeft:'10px'}}>Fusion</Typography> Starts Here!
        </Typography>
        </Box>
        <Box>
        <StreamParty/>
        </Box>
    </Box>
  )
}

export default HomeImagesContainer