import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const ProfilePhoto = () => {

  const { theme } = useThemeContext();

  return (
    <Box sx={{ display: 'flex', justifyContent:'center', transform:'translateY(-20px)'}}>
    <Avatar sx={{height:'144px', width: '144px', border:`4px solid ${theme.palette.secondary.main}`}}>

    </Avatar>
    </Box>
  )
}

export default ProfilePhoto