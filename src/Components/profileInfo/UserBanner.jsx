import React, { useEffect, useState } from 'react'
import { Box, Card, CardMedia, Typography }  from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import { useMediaQuery } from '@mui/material'
import '../../styles/profile.css'

const UserBanner = ({viewUserId}) => {
  const dispatch = useDispatch()
  const { theme, mode } = useThemeContext()
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const isLoggedIn = useSelector((state) => !!state.user.defaultUser?.id);
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)
  const isOwnProfile = loggedInUserId === Number(viewUserId); 
  //boolean true if is accessing user from params id, false if not
  const loggedInUserName = useSelector((state) => state.user.defaultUser?.userName)
  const viewUser = useSelector((state) => state.user.openProfiles.find((profile) => profile.userId == viewUserId));

  // const openProfs = useSelector((state) => state.user.openProfiles);
  // const thisUser = openProfs.find((user) => user.id == viewUserId);
  const openProfiles = useSelector((state) => state.user.openProfiles);
  const thisUser = openProfiles.find((user) => user.id == viewUserId);
  const viewUserName = thisUser?.userName;


  // Find the user object with id 6 in the openProfiles array

  // useEffect(() => {
  // const thisUser = openProfs.find((user) => user.id == viewUserId);
  //   console.log(thisUser,'USER');
  //   console.log(thisUser?.userName,'USERNAME');
  //   setViewUserName(thisUser?.userName);
  // },[openProfs])

  useEffect(() => {
    console.log(viewUser?.userName,'helllooooo');
  },[viewUser])

  useEffect(() => {
    console.log(loggedInUserName)
    console.log(isOwnProfile)
  },[])

  return (
   <Box id={mode === 'light' ? "user-banner" : 'dark-user-banner'}
    >
    <Card sx={{display: 'flex', alignItems:'center', justifyContent:'center', textAlign:'center', transform:'translateY(-20px)'}}>
      <Typography variant={isSmallScreen ? ('h6') : ('h5')} sx={{fontFamily:`'Bungee Hairline',monospace`, fontWeight:'700',
    color: theme.palette.text.primary, WebkitTextStrokeWidth: '2px',WebkitTextStrokeColor:theme.palette.text.primary}}>
          @{isOwnProfile ? loggedInUserName : viewUserName}
      </Typography>
      </Card>
    </Box>
  )
}

export default UserBanner