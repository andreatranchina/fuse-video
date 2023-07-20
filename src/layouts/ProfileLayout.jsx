import React from 'react'
import { useSelector } from 'react-redux'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import UploadProfilePhoto from '../components/profileInfo/UploadProfilePhoto'
import UserBanner from '../components/profileInfo/UserBanner'
import ProfilePhoto from '../components/profileInfo/ProfilePhoto'
import EditProfile from '../components/profileInfo/EditProfile'
import GoLiveButton from '../components/profileInfo/GoLiveButton'
import FollowProfile from '../components/profileInfo/FollowProfile'
import MessageUser from '../components/profileInfo/MessageUser'
import UserLocation from '../components/profileInfo/UserLocation'
import Followers from '.././components/profileInfo/Followers'
import Bio from '../components/bio/Bio'
import Topics from '../components/bio/Topics'
import EditInfoForm from '../components/bio/EditInfoForm'
import StreamHistory from '../components/streamHistory/StreamHistory'

const ProfileInfoLayout = () => {

   const isLoggedIn = useSelector((state) => !!state.user.id);

  return (
     <Stack>
          {/* PROFILE PIC AND BIO */}
            <Grid container sx={{backgroundColor:'red',color:'white', flexGrow: 1 }}>
              <Grid item xs={4} sx={{backgroundColor:'green',color:'white', height:'55vh'}}>
                <Grid container sx={{backgroundColor:'red', minHeight:'100%', justifyContent:'center'}}>
                    <Grid item sx={{marginBottom:'-100px'}}>
                      <UserBanner/>
                    </Grid>
                    <Stack>
                    <Grid item>
                      <UploadProfilePhoto/>
                      <ProfilePhoto/>
                    </Grid>
                    <Grid item sx={{margin:'10px'}}>
                      <UserLocation/>
                      <Followers/>
                    </Grid>
                      <Grid item sx={{display:'flex', justifyContent:'center'}}>
                        {isLoggedIn ? <EditProfile/> : <FollowProfile/>}
                        {isLoggedIn ? <GoLiveButton/> : <MessageUser/>}
                      </Grid>
                    </Stack>
                </Grid>
              </Grid>
              <Grid item xs={8} sx={{backgroundColor:'purple',color:'white'}}>
                <Grid container sx={{backgroundColor:'green', minHeight:'100%'}}>
                  <Stack spacing={2}>
                      <Bio/>
                      <Topics/>
                      <EditInfoForm/>
                  </Stack>
                </Grid>
              </Grid>
              {/* PAST STREAMS */}
              <Grid container>
                <Grid item xs={12} sx={{backgroundColor:'orange', height:'45vh'}}>
                  <StreamHistory/>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
  )
}

export default ProfileInfoLayout