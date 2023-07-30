import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import StreamPartyImage from '../../assets/party-livestream.webp'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const StreamParty = () => {
  const { mode } = useThemeContext();
  const isSmallScreen = useMediaQuery('(max-width: 900px');
  const isMobileScreen = useMediaQuery('(max-width: 420px)');

  return (
     <Box
     component="img"
        sx={{position: 'absolute', 
         height:isMobileScreen ? '46%' : isSmallScreen ? '60%' : '80%',borderRadius:'5%', transform: isMobileScreen ? 
         '' : isSmallScreen ? 'translate(-250px, -100px)' : 'translate(-50px, -200px)', boxShadow: 'rgba(38, 57, 77, 0.5) 0px 20px 30px -10px'
        }}
        alt="Female skateboarder watching livestream outside"
        src={StreamPartyImage}
        >
    </Box>
  )
}

export default StreamParty