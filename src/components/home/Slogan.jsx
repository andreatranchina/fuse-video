import React from 'react'
import { Box, Card, Stack, Typography, useMediaQuery } from '@mui/material'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const Slogan = () => {

  const { theme, mode } = useThemeContext();
  const isSmallScreen = useMediaQuery('(max-width: 1000px');
  const isMobileScreen = useMediaQuery('(max-width: 420px)');
  return (
    <Box display={'flex'} justifyContent={'center'} sx={{alignItems:'center', position: 'relative', zIndex: 5, marginRight:'50px'}}>
      <Stack direction='row' justifyContent={'center'} sx={{alignItems:'center'}}>
      <Stack sx={{width:'650px', textAlign: isMobileScreen ? 'center' : '', transform: isMobileScreen ? 'translateX(-140px)' : ''}}>
        <Typography variant={isMobileScreen ? 'h3' : isSmallScreen ? 'h2' : 'h1'} sx={{fontFamily:`'Bungee Inline', cursive`, color: theme.palette.text.header, textShadow: mode === 'light' ? ('0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white') : ('0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black'),}}>
          Connect 
        </Typography>
         <Typography variant={isMobileScreen ? 'h3' : isSmallScreen ? 'h2' : 'h1'} sx={{fontFamily:`'Bungee Inline', cursive`, color: theme.palette.text.header, textShadow: mode === 'light' ? ('0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white') : ('0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black'),}}>
          Stream
        </Typography>
        <Typography variant={isMobileScreen ? 'h3' : isSmallScreen ? 'h2' : 'h1'} sx={{fontFamily:`'Bungee Inline', cursive`, color: theme.palette.text.header, textShadow: mode === 'light' ? ('0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white') : ('0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black'),}}>
          & Discover
        </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Slogan
