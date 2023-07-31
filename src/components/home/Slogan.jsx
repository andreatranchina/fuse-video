import React from 'react'
import { Box, Card, Stack, Typography, useMediaQuery } from '@mui/material'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const Slogan = () => {

  const { theme, mode } = useThemeContext();
  const isSmallScreen = useMediaQuery('(max-width: 900px');
  const isMobileScreen = useMediaQuery('(max-width: 420px)');
  return (
    <Box display={'flex'} justifyContent={'center'} sx={{alignItems:'center', zIndex:10}}>
      <Stack direction='row' justifyContent={'center'} sx={{alignItems:'center', position:'absolute', transform: isMobileScreen ? 'translate(180px,110px)' : isSmallScreen ? 'translate(280px,110px)' : 'translate(400px,20px)'}}>
      <Stack sx={{width:'650px'}}>
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
