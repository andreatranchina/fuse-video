import React from 'react'
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import StreamParty from './StreamParty'
import WavyBackground from '../../assets/wavy-pattern.webp'
import { motion } from 'framer-motion'

const HomeImagesContainer = () => {

  const isSmallScreen = useMediaQuery('(max-width: 1000px');
  const isXtraSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMobileScreen = useMediaQuery('(max-width: 420px)');
  const user = useSelector((state) => state.user.defaultUser);

  const avatarVariants = {
    hidden: {
      opacity: 0,
      y: '-100vh'
    },
    visible: {
      opacity: 1,
      y: 0,
      zIndex: 900,
      position: 'relative',
      //embedded because it knows to look for visible and apply transition inside it
      transition: {
        type:'spring', stiffness: 150, delay:0.5
      }
    }
  }

  return (
    <Box sx={{display: isMobileScreen ? 'flex' : '', justifyContent: isMobileScreen ? 'center' : '', marginTop:user? '-10px' : '', height:'300px'}}>
    <motion.div
      variants={avatarVariants}
      initial="hidden"
      animate="visible"
      transition= {{ type: 'spring', delay: 0.5}}
      style={{zIndex:99, }}
    >
     <Avatar variant='circle' src={WavyBackground} sx={{width: isSmallScreen ? '150px' : '220px', height:isMobileScreen ? '' : isSmallScreen ? '150px' : '220px', transform:isMobileScreen ? '' : isXtraSmallScreen ? 'translate(40px,135px)' : isSmallScreen ? 'translate(-40px,140px)' : 'translate(-90px,50px)',zIndex:4}}>
			</Avatar>
      <Box sx={{width:'400px', transform: isXtraSmallScreen ? 'translate(60px,15px)' : isSmallScreen ? 'translate(-15px,20px)' : 'translate(-63px,-120px)', position:'relative', zIndex:5}}>
        <Typography variant={isMobileScreen ? 'caption' : isSmallScreen ? 'h6' : 'h4'} sx={{fontFamily:`'Kalam', cursive`, color:'black', textShadow: '0 0 12px white, 0 0 12px white, 0 0 12px white, 0 0 12px white'}}>
          Your Social <Typography variant={isMobileScreen ? 'caption' : isSmallScreen ? 'h6' : 'h4'} sx={{fontFamily:`'Bungee Inline', cursive`, marginLeft:'10px'}}>Fusion</Typography> Starts Here!
        </Typography>
      </Box>
      </motion.div>
        {isXtraSmallScreen ? ' ' : (<Box sx={{transform: isSmallScreen ? 'translate(20px, -60px)' : 'translate(20px, -300px)', width:'90%'}}>
      <StreamParty/>
         </Box>)}
        
    </Box>
  )
}

export default HomeImagesContainer
