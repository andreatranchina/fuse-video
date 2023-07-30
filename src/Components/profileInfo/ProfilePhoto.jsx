import React, {useEffect, useState, useRef} from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import {useSelector} from 'react-redux'

const ProfilePhoto = ({uploadedPhoto}) => {

  const { theme } = useThemeContext();
  const loggedInUser = useSelector((state) => state.user.defaultUser);

  return (
    <Box sx={{ display: 'flex', justifyContent:'center', transform:'translateY(-20px)'}}>
    {
      loggedInUser?.imgUrl
      ? <img alt="avatar" src={loggedInUser.imgUrl} 
      style={{height:'144px', width: '144px', border:`4px solid ${theme.palette.secondary.main}`, borderRadius:'10rem'}}  
      />
      : <Avatar sx={{height:'144px', width: '144px', border:`4px solid ${theme.palette.secondary.main}`}}></Avatar>
    }
    </Box>
  )
}

export default ProfilePhoto