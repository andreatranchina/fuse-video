import React from 'react'
import Box from '@mui/material/Box'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import JamLivestream from './JamLivestream';
import '../../styles/myswiper.css'
import SkateboardStream from './SkateboardStream';
import BusinessMeeting from './BusinessMeeting';
import CoolStream from './CoolStream';

const MobileSwiper = () => {

  return (
    <Box
      sx={{
         width: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center', transorm: 'translate(-260px, 0px)' 
      }}
    >
      <Swiper
        cssMode={true}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
        style={{ alignItems: 'center' }}
      >
        <SwiperSlide style={{height: '250px', justifyContent:'center', alignItems:'center'}}>
          <JamLivestream />
        </SwiperSlide>
        <SwiperSlide style={{height:'250px'}}>
          <SkateboardStream/>
        </SwiperSlide>
        <SwiperSlide style={{height:'250px'}}>
          <BusinessMeeting/>
        </SwiperSlide>
        <SwiperSlide style={{height:'250px'}}>
          <CoolStream/>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default MobileSwiper
