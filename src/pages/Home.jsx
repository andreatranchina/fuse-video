import React, { useEffect } from 'react';
import { Box, Grid, Stack } from "@mui/material";
import '../styles/home.css';
import { useThemeContext } from "../theme/ThemeContextProvider";
import { useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slogan from '../components/home/Slogan';
import Description from '../components/home/Description';
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
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const isMobileScreen = useMediaQuery('(max-width: 420px)');

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
        sx={{ display: 'flex', justifyContent: 'center', marginTop: user ? '50px' : '' }}
      >
        <Stack sx={{ alignItems: 'center' }} spacing={3}>
          <Slogan />
          <SubSlogan />
          <MobileAvatarSlogan />
          <MobileDescription />
          <MobileSwiper />
        </Stack>
      </Box>
    ) : isSmallScreen ? (
      <Box
        id={mode === 'light' ? 'home-light' : 'home-dark'}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: user ? '50px' : '' }}
      >
        <Stack sx={{ width: '70%' }}>
          <Stack direction='row' sx={{ width: '100vw' }}>
            <Grid container direction='column' sx={{ height: '100%' }}>
              <Grid item xs={6} sx={{ display: 'flex', width: '100%' }}>
                <Slogan />
              </Grid>
            </Grid>
            <Stack sx={{ width: '30%', alignItems: 'centers' }}>
              <Box>
                <HomeImagesContainer />
              </Box>
            </Stack>
          </Stack>

          <Box sx={{ width: '100%', height: '100%', alignItems: 'center', transform: 'translate(-100px,-60px)', zIndex: 2 }}>
            <Description />
          </Box>
        </Stack>
      </Box>
    ) : (
      <Box
        id={mode === 'light' ? 'home-light' : 'home-dark'}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: user ? '50px' : '' }}
      >
        <Stack direction='row' sx={{ width: '100vw' }}>
          <Stack sx={{ width: '70%' }}>
            <Grid container direction='column' sx={{ height: '100%' }}>
              <Grid item xs={6} sx={{ display: 'flex', width: '100%' }}>
                <Slogan />
              </Grid>
              <Grid item xs={6} sx={{ width: '100%', height: '100%', alignItems: 'center', transform: 'translateY(-50px)', zIndex: 2 }}>
                <Description />
              </Grid>
            </Grid>
          </Stack>
          <Stack sx={{ width: '30%', alignItems: 'centers' }}>
            <Box>
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