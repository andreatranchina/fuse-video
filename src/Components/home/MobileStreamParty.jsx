import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import StreamPartyImage from '../../assets/party-livestream.webp'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const MobileStreamParty = () => {
  const { mode } = useThemeContext();
  const isSmallScreen = useMediaQuery('(max-width: 900px');
  const isMobileScreen = useMediaQuery('(max-width: 420px)');

  return (
     <Box
     component="img"
        sx={{ height:'20%' ,borderRadius:'5%', boxShadow: 'rgba(38, 57, 77, 0.5) 0px 20px 30px -10px'
        }}
        alt="Female skateboarder watching livestream outside"
        src={StreamPartyImage}
        >
    </Box>
  )
}

export default MobileStreamParty