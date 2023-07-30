import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import { useMediaQuery } from '@mui/material'

const UserBanner = ({viewUserId}) => {
  const dispatch = useDispatch()
  const { theme } = useThemeContext()
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
    <Box >
      <Typography variant={isSmallScreen ? ('h5') : ('h4')} sx={{fontFamily:`'Bungee Hairline',monospace`, fontWeight:'700', marginTop:'18px',
    color: theme.palette.text.primary}}>
          {isOwnProfile ? loggedInUserName : viewUserName}
      </Typography>
    </Box>
  )
}

export default UserBanner