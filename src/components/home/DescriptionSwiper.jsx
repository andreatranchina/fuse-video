import React from 'react'
import { Box, Card, Grid, Typography, useMediaQuery } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import JamLivestream from './JamLivestream';
import '../../styles/myswiper.css'
import { useThemeContext } from '../../theme/ThemeContextProvider';
import SkateboardStream from './SkateboardStream';
import BusinessMeeting from './BusinessMeeting';
import CoolStream from './CoolStream';

const DescriptionSwiper = () => {

  const { mode, theme } = useThemeContext();
  const isSmallScreen = useMediaQuery('(max-width: 900px');
  const isXtraSmallScreen = useMediaQuery('(max-width: 700px');
  const isMobileScreen = useMediaQuery('(max-width: 420px)');

  return (
    <Box
      sx={{
         width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft:isXtraSmallScreen ? '20px' : ''
      }}
    >
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
        style={{ alignItems: 'center' }}
      >
        <SwiperSlide style={{height:isSmallScreen ? '200px' : '250px'}}>
        <Grid container >
              <Grid item xs={6} md={4} sx={{paddingLeft:'20px'}}>
                <JamLivestream/>
              </Grid>
              <Grid item xs={6} md={8}>
              <Card >
               <Typography variant={isMobileScreen ? 'caption' : isSmallScreen ? 'subtitle2' : 'h6'} sx={{fontFamily:`'Roboto mono', monospace`, fontWeight: 700, position:'absolute', color: mode === 'light' ? 'white' : theme.palette.text.primary, textShadow: '0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black'}}>
                Welcome to a comprehensive social ecosystem designed to cater to all your networking needs! Embrace the power of connection by following others and building a network of friends, colleagues, and influencers.
               </Typography>
               </Card>
              </Grid>
            </Grid>
        </SwiperSlide>
          <SwiperSlide style={{height:'250px'}}>
        <Grid container >
              <Grid item xs={6} md={4} sx={{paddingLeft:'20px'}}>
                <SkateboardStream/>
              </Grid>
              <Grid item xs={6} md={8}>
              <Card >
               <Typography variant={isMobileScreen ? 'caption' : isSmallScreen ? 'subtitle2' : 'h6'} sx={{fontFamily:`'Roboto mono', monospace`, fontWeight: 700, position:'absolute', color: mode === 'light' ? 'white' : theme.palette.text.primary, textShadow: '0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black'}}>
               Livestream your passions and interests to a captivated audience or join exciting livestreams hosted by others. Follow friends and favorite creators to build your network and never miss a moment of their content. 
               </Typography>
               </Card>
              </Grid>
            </Grid>
        </SwiperSlide>
        <SwiperSlide style={{height:'250px'}}>
        <Grid container >
              <Grid item xs={6} md={4} sx={{paddingLeft:'20px'}}>
                <BusinessMeeting/>
              </Grid>
              <Grid item xs={6} md={8}>
              <Card >
                <Typography variant={isMobileScreen ? 'caption' : isSmallScreen ? 'subtitle2' : 'h6'} sx={{fontFamily:`'Roboto mono', monospace`, fontWeight: 700, position:'absolute', color: mode === 'light' ? 'white' : theme.palette.text.primary, textShadow: '0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black'}}>
               Experience the world in your preferred language with instant message translation, transcending borders and making meaningful connections. Now you can break language barriers, ensuring seamless communication and understanding between users worldwide.
               </Typography>
               </Card>
              </Grid>
            </Grid>
        </SwiperSlide>
        <SwiperSlide style={{height:'250px'}}>
        <Grid container >
              <Grid item xs={6} md={4} sx={{paddingLeft:'20px'}}>
                <CoolStream/>
              </Grid>
              <Grid item xs={6} md={8} >
              <Card >
               <Typography variant={isMobileScreen ? 'caption' : isSmallScreen ? 'subtitle2' : 'h6'} sx={{fontFamily:`'Roboto mono', monospace`, fontWeight: 700, position:'absolute', color: mode === 'light' ? 'white' : theme.palette.text.primary, textShadow: '0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black'}}>
               Relive memorable moments by accessing past livestreams of the users you follow. The possibilities are boundless on this platform built for enriching social interactions. Welcome to a world where connection, expression, and exploration thrive!
               </Typography>
               </Card>
              </Grid>
            </Grid>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default DescriptionSwiper;
