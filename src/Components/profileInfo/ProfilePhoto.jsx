import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const ProfilePhoto = ({viewUserId}) => {

  const { theme } = useThemeContext();
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)
  const isOwnProfile = loggedInUserId === Number(viewUserId); 

  return (
    <Box sx={{ display: 'flex', justifyContent:'center', transform:'translateY(-20px)'}}>
    <Avatar sx={{height:'144px', width: '144px', border:`4px solid ${theme.palette.secondary.main}`}}>

    </Avatar>
    </Box>
  )
}

export default ProfilePhoto