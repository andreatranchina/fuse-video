import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import VideoThumbnail from './VideoThumbnail'
import { useSelector } from 'react-redux'

const StreamHistory = ({viewUserId}) => {
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)
  const isOwnProfile = loggedInUserId === Number(viewUserId); 
  
  return (
    <Grid container >
      <Grid item/>
        <Typography>
          Stream history
        </Typography>
      <Grid/>
      <Grid item/>
        <Grid container>
          <VideoThumbnail/>
        </Grid>
      <Grid/>
    </Grid>
  )
}

export default StreamHistory