import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

const Profile = () => {
  return (
    <Box sx={{height:'100%', width:'100%', backgroundColor:'red'}}>
    <Grid container sx={{backgroundColor:'grey'}}>
        <Grid item xs={2} sm= {1} sx={{backgroundColor:'yellow', minHeight:'100vh'}}>
            Group messages
        </Grid>
        <Grid item xs={2} sm= {1} sx={{backgroundColor:'blue',color:'white'}}>
            Private messages
        </Grid>
        <Grid item xs={8} sm={10}>
        <Stack sx={{flexGrow: 1}}>
            <Grid container sx={{backgroundColor:'red',color:'white', flexGrow: 1 }}>
            <Grid item xs={6} sx={{backgroundColor:'green',color:'white', height:'55vh'}}>
            Profile pic and follow button
            </Grid>
            <Grid item xs={6} sx={{backgroundColor:'purple',color:'white'}}>
            bio and editable info
            </Grid>
            <Grid container>
            <Grid item xs={12} sx={{backgroundColor:'orange', height:'45vh'}}>
            past streams
            </Grid>
            </Grid>
        </Grid>
        </Stack>
        </Grid>
    </Grid>
    </Box>

  )
}

export default Profile