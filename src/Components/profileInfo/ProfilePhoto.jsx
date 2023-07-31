import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const ProfilePhoto = ({viewUserId}) => {

  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)
  const isOwnProfile = loggedInUserId === Number(viewUserId); 
  const { theme } = useThemeContext();
  const imgUrl = useSelector((state) => state.user.defaultUser?.imgUrl)

  return (
    //NEED TO IMPLEMENT VIEWING OTHER'S PHOTOS
    <Box sx={{ display: 'flex', justifyContent:'center', transform:'translateY(-20px)'}}>
    {
      imgUrl && isOwnProfile ? <img alt="avatar" src={imgUrl} 
      style={{height:'144px', width: '144px', border:`4px solid ${theme.palette.secondary.main}`, borderRadius:'10rem'}}  
      />
      : <Avatar sx={{height:'200px', width: '200px', border:`4px solid ${theme.palette.secondary.main}`}}></Avatar>
    }
    </Box>
  )
}

export default ProfilePhoto