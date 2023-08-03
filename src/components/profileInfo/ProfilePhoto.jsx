import React, { useEffect} from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import LoggedInImage from '../.././assets/stylish-confident-businesswoman-smiling.webp'

const ProfilePhoto = ({viewUserId}) => {

  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)
  const isOwnProfile = loggedInUserId === Number(viewUserId); 
  const { theme } = useThemeContext();
  const loggedInUser = useSelector((state) => state.user.defaultUser);
  const imgUrl = useSelector((state) => state.user.defaultUser?.imgUrl)
  const viewUser = useSelector((state) => state.user.openProfiles?.find((profile) => profile.userId == viewUserId));

  useEffect(() => {
    console.log(loggedInUser);
  },[])

  return (
    //NEED TO IMPLEMENT VIEWING OTHER'S PHOTOS
    <Box sx={{ display: 'flex', justifyContent:'center', transform:'translateY(-20px)'}}>
    {
      imgUrl != null && isOwnProfile ? <Avatar> src={imgUrl} 
      style={{height:'144px', width: '144px', border:`4px solid ${theme.palette.secondary.main}`, borderRadius:'10rem'}}  
      </Avatar>
      : <Avatar sx={{height:'200px', width: '200px', border:`4px solid ${theme.palette.secondary.main}`}} src={viewUser?.imgUrl}></Avatar>
    }
    </Box>
  )
}

export default ProfilePhoto
