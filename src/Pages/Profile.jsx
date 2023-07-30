import React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MessageBarLayout from '../layouts/MessageBarLayout'
import ProfileInfoLayout from '../layouts/ProfileInfoLayout'

const Profile = () => {
  const isLoggedIn = useSelector((state) => !!state.user.defaultUser?.id);
  const userId = useSelector((state) => state.user.defaultUser?.id);
  const firstName = useSelector((state) => state.user.defaultUser?.firstName);
  const lastName = useSelector((state) => state.user.defaultUser?.lastName);
  const userName = useSelector((state) => state.user.defaultUser?.userName);
  const imgUrl = useSelector((state) => state.user.defaultUser?.imgUrl)
  const bio = useSelector((state) => state.user.defaultUser?.bio)
  const country = useSelector((state) => state.user.defaultUser?.country)
  const city = useSelector((state) => state.user.defaultUser?.city)
  const state = useSelector((state) => state.user.defaultUser?.state)

  return (
    <Box sx={{height:'100%', width:'100%'}}>
    {/* SIDE BAR MESSAGING */}
      <Grid container sx={{marginTop: isLoggedIn ? '55px' : ''}}>
        <MessageBarLayout/>
        <Grid item xs={8} sm={9} md={10}>
          <ProfileInfoLayout/>
        </Grid>
      </Grid>
    </Box>

  )
}

export default Profile