import React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MessageBarLayout from '../layouts/MessageBarLayout'
import ProfileInfoLayout from '../layouts/ProfileLayout'

const Profile = () => {
  const isLoggedIn = useSelector((state) => !!state.user.id);

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