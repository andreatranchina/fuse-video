import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import StreamPartyImage from '../../assets/party-livestream.webp'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const StreamParty = () => {
  const { mode } = useThemeContext();
  const isSmallScreen = useMediaQuery('(max-width: 900px');
  const isTabletScreen = useMediaQuery('(max-width: 768px)');
  const isXtraSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMobileScreen = useMediaQuery('(max-width: 420px)');

  return (
     <Box
     component="img"
        sx={{
        width: isTabletScreen ? '70%' : '100%',
         height: isTabletScreen ? '60%' : isSmallScreen ? '100%' : '80%', borderRadius:'5%',  boxShadow: 'rgba(38, 57, 77, 0.5) 0px 20px 30px -10px', 
        }}
        alt="Female skateboarder watching livestream outside"
        src={StreamPartyImage}
        >
    </Box>
  )
}

export default StreamParty
