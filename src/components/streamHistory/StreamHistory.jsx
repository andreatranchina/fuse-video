import React, {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import VideoThumbnail from './VideoThumbnail'
import { useSelector } from 'react-redux'
import axios from 'axios';

import { Box } from '@mui/material'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import "../../styles/myswiper.css";

const StreamHistory = ({viewUserId}) => {
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)
  const isOwnProfile = loggedInUserId === Number(viewUserId); 
  const loggedInUser = useSelector((state) => state.user.defaultUser);
  const [videos, setVideos] = useState([]);

  useEffect (() => {
    const fetchVideos = async () => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recordings/byUser/${viewUserId}`);
            console.log(response.data);
            setVideos([...response.data])

        }
        catch(error){
            console.log(error);
        }

    }
    fetchVideos();
}, [])

if (!videos) {
  return <div style={{marginTop: "6rem"}}>Loading...</div>;
} 
  return (
    <div>        
      <Box sx={{width: '800px', justifyContent: 'center', 
        alignItems: 'center' }}
      >
      <Swiper
        // cssMode={true}
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        className="mySwiper"
        slidesPerView={videos.length <2 ? 1 : 2}
        style={{ alignItems: 'center', margin: "5px auto", display: "block" }}
      >
      {videos.map((recording, index) => {
      return(
        <SwiperSlide style={{margin: "5px auto", height: '280px', justifyContent:'center', alignItems:'center'}}>
          <div className="video-card-profile-page">
              <div className="video-title">{recording.title}</div>
              <video className="video-element" controls>
                  <source src={recording.downloadUrl} />
              </video>                
          </div> 
          </SwiperSlide>       
          )
    })}

    </Swiper>
    </Box>
      </div>
  )
}

export default StreamHistory
