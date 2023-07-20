import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import VideoThumbnail from './VideoThumbnail'

const StreamHistory = () => {
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