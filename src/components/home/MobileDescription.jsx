import React from 'react'
import { Box, Card, Grid, Stack, Typography, useMediaQuery } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination  } from 'swiper/modules';
import '../../styles/myswiper.css'
import { useThemeContext } from '../../theme/ThemeContextProvider';

const MobileDescription = () => {
  const { mode, theme } = useThemeContext();

  return (
    <Box
      sx={{width:'300px'}}
    >
      <Swiper
        cssMode={true}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
        style={{ alignItems: 'center'}}
      >
        <SwiperSlide>
            <Typography variant='subtitle2' sx={{ fontFamily: `'Roboto mono', monospace`, fontWeight: 700, color: mode === 'light' ? 'white' : theme.palette.text.primary, textShadow: '0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black' }}>
              Welcome to a comprehensive social ecosystem designed to cater to all your networking needs! Embrace the power of connection by following others and building a network of friends, colleagues, and influencers.
            </Typography>
        </SwiperSlide>
        <SwiperSlide>
            <Typography variant= 'subtitle2' sx={{fontFamily:`'Roboto mono', monospace`, fontWeight: 700, color: mode === 'light' ? 'white' : theme.palette.text.primary, textShadow: '0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black'}}>
              Livestream your passions and interests to a captivated audience or join exciting livestreams hosted by others. Follow friends and favorite creators to build your network and never miss a moment of their content. 
            </Typography>
        </SwiperSlide>
        <SwiperSlide>
            <Typography variant='subtitle2' sx={{fontFamily:`'Roboto mono', monospace`, fontWeight: 700, color: mode === 'light' ? 'white' : theme.palette.text.primary, textShadow: '0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black'}}>
              Experience the world in your preferred language with instant message translation, transcending borders and making meaningful connections. Now you can break language barriers, ensuring seamless communication and understanding between users worldwide.
            </Typography>
        </SwiperSlide>
        <SwiperSlide>
            <Typography variant='subtitle2' sx={{fontFamily:`'Roboto mono', monospace`, fontWeight: 700, color: mode === 'light' ? 'white' : theme.palette.text.primary, textShadow: '0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black'}}>
              Relive memorable moments by accessing past livestreams of the users you follow. The possibilities are boundless on this platform built for enriching social interactions. Welcome to a world where connection, expression, and exploration thrive!
            </Typography>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default MobileDescription
