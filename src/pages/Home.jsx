import React, { useEffect } from 'react';
import { Box, Grid, Stack } from "@mui/material";
import '../styles/home.css';
import { useThemeContext } from "../theme/ThemeContextProvider";
import { useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import Slogan from '../components/home/Slogan';
import DescriptionSwiper from '../components/home/DescriptionSwiper';
import HomeImagesContainer from '../components/home/HomeImagesContainer';
import MobileDescription from '../components/home/MobileDescription';
import MobileAvatarSlogan from '../components/home/MobileAvatarSlogan';
import MobileSwiper from '../components/home/MobileSwiper'
import SubSlogan from '../components/home/SubSlogan'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.defaultUser);
  const { mode } = useThemeContext();
  const isSmallScreen = useMediaQuery('(max-width: 1000px)');
  const isTabletScreen = useMediaQuery('(max-width: 768px)');
  const isXtraScreen = useMediaQuery('(max-width: 600px)');
  const isMobileScreen = useMediaQuery('(max-width: 420px)');

  const avatarVariants = {
    hidden: {
      opacity: 0,
      y: '-100vh'
    },
    visible: {
      opacity: 1,
      y: 0,
      position: 'relative',
      //embedded because it knows to look for visible and apply transition inside it
      transition: {
        type:'spring', stiffness: 150, delay:0.5
      }
    }
  }

  useEffect(() => {
    if (user) {
    console.log(user)
    }
  },[])

 return (
  <Box>
    {isMobileScreen ? (
      <Box
        id={mode === 'light' ? 'mobile-home-light' : 'mobile-home-dark'}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: user ? '50px' : '', position:'absolute' }}
      >
        <Stack sx={{ alignItems: 'center', justifyContent:'center' }} spacing={3}>
        <motion.div
          variants={avatarVariants}
        initial="hidden"
        animate="visible"
        transition= {{ type: 'spring', delay: 0.5}}
        
        >
          <Slogan />
          <MobileAvatarSlogan />
        </motion.div>
        <Box sx={{transform:'translateX(-150px)'}}>
          <MobileDescription />
          <MobileSwiper />
        </Box>
        </Stack>
      </Box>
    ) : isTabletScreen ? (
      <Box
        id={mode === 'light' ? 'home-light' : 'home-dark'}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: user ? '50px' : ''}}
      >
        <Stack direction='row' sx={{ width: '100vw', marginLeft:'80px' }}>
          <Stack sx={{ width: '70%' }}>
            <Grid container direction='column' sx={{ height: '100%'}}>
              <Grid item xs={6} sx={{ display: 'flex', width: '100%'}}>
                <Slogan />
              </Grid>
              <Grid item xs={6} sx={{ width: '400px', height: '90%', alignItems: 'center', zIndex: 2, marginTop:'-150px' }}>
                <DescriptionSwiper />
              </Grid>
               <Stack sx={{ width: '30%', alignItems: 'center' }}>
            <Box sx={{transform:'translate(10px,-55px)'}}>
              <HomeImagesContainer />
            </Box>
          </Stack>
            </Grid>
          </Stack>
        </Stack>
      </Box>
    ) : isSmallScreen ? (
     <Box
        id={mode === 'light' ? 'home-light' : 'home-dark'}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: user ? '50px' : ''}}
      >
        <Stack direction='row' sx={{ width: '100vw',  }}>
          <Stack sx={{ width: '70%' }}>
            <Grid container direction='column' sx={{ height: '100%'}}>
              <Grid item xs={6} sx={{ display: 'flex', width: '100%', marginLeft: '20px'}}>
                <Slogan />
              </Grid>
              <Grid item xs={6} sx={{ width: '100%', height: '90%', alignItems: 'center', zIndex: 2, marginTop:'-150px' }}>
                <DescriptionSwiper />
              </Grid>
               <Stack sx={{ width: '30%', alignItems: 'center' }}>
            <Box sx={{transform:'translate(-70px,-115px)'}}>
              <HomeImagesContainer />
            </Box>
          </Stack>
            </Grid>
          </Stack>
        </Stack>
      </Box>
    ) : (
      <Box
        id={mode === 'light' ? 'home-light' : 'home-dark'}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: user ? '65px' : ''}}
      >
        <Stack direction='row' sx={{ width: '100vw',  }}>
          <Stack sx={{ width: '70%' }}>
            <Grid container direction='column' sx={{ height: '100%'}}>
              <Grid item xs={6} sx={{ display: 'flex', width: '100%', marginLeft: '50px'  }}>
                <Slogan />
              </Grid>
              <Grid item xs={6} sx={{ width: '100%', height: '90%', alignItems: 'center', zIndex: 2, marginTop:'-60px' }}>
                <DescriptionSwiper />
              </Grid>
            </Grid>
          </Stack>
          <Stack sx={{ width: '30%', alignItems: 'center' }}>
            <Box sx={{transform:'translate(-50px,-15px)'}}>
              <HomeImagesContainer />
            </Box>
          </Stack>
        </Stack>
      </Box>
    )}
  </Box>
);

    }

export default Home