import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import MessageBarLayout from '../layouts/MessageBarLayout'
import ProfileInfoLayout from '../layouts/ProfileLayout'

const Profile = () => {
  return (
    <Box sx={{height:'100%', width:'100%'}}>
    {/* SIDE BAR MESSAGING */}
      <Grid container >
        <MessageBarLayout/>
        <Grid item xs={8} sm={9} md={10}>
          <ProfileInfoLayout/>
        </Grid>
      </Grid>
    </Box>

  )
}

export default Profile