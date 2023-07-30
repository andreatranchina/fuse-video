import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { Backdrop, Card, Grid, Stack }  from '@mui/material'
import UploadProfilePhoto from '../components/profileInfo/UploadProfilePhoto'
import UserBanner from '../components/profileInfo/UserBanner'
import ProfilePhoto from '../components/profileInfo/ProfilePhoto'
import EditProfile from '../components/profileInfo/EditProfile'
import GoLiveButton from '../components/profileInfo/GoLiveButton'
import FollowProfile from '../components/profileInfo/FollowProfile'
import MessageUser from '../components/profileInfo/MessageUser'
import UserLocation from '../components/profileInfo/UserLocation'
import Followers from '../components/profileInfo/Followers'
import Bio from '../components/bio/Bio'
import Topics from '../components/bio/Topics'
import EditInfoForm from '../components/userDetails/account/EditAccountForm'
import StreamHistory from '../components/streamHistory/StreamHistory'
import NowLive from '../components/profileInfo/NowLive'
import { useMediaQuery } from '@mui/material'

const ProfileInfoLayout = () => {

  //  const isLoggedIn = useSelector((state) => !!state.user.id);
  const isLoggedIn = true;
   const isSmallScreen = useMediaQuery('(max-width: 900px)');
   const isEditing = useSelector((state) => !state.user.defaultUser?.isEditingAccount)
   const userId = useSelector((state) => state.user.defaultUser?.id)

   const [uploadedPhoto, setUploadedPhoto] = useState(false);

   //if the pro
  return (
     <Stack>
          {/* PROFILE PIC AND BIO */}
            <Grid container sx={{color:'white', flexGrow: 1 }}>
              <Grid item xs={4} sx={{color:'white', height:'55vh'}}>
                <Grid container sx={{minHeight:'100%', justifyContent:'center', alignItems:'center'}}>
                    <Grid item sx={{marginTop:'-40px'}}>
                      <UserBanner/>
                    </Grid>
                    <Stack>
                    <Grid item sx={{marginTop:'-100px'}}>
                    {/* NEED TO PASS " IS LIVE " SO AS TO HAVE THE VIEWER JOIN THE LIVESTREAM */}
                      {isLoggedIn ? (<UploadProfilePhoto setUploadedPhoto={setUploadedPhoto} uploadedPhoto={uploadedPhoto}/>) : (<NowLive/>)}
                      <ProfilePhoto uploadedPhoto={uploadedPhoto}/>
                    </Grid>
                    <Grid item sx={{margin:'10px', transform:'translateY(-20px)'}}>
                      <UserLocation/>
                      <Followers/>
                    </Grid>
                    {/* The buttons should lay on top of one another if the screen gets to 900px and below until mobile screen size is reached*/}
                      <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                {isSmallScreen ? (
                  <Stack spacing={1} >
                    {isLoggedIn ? <EditProfile /> : <FollowProfile />}
                    {isLoggedIn ? <GoLiveButton /> : <MessageUser />}
                  </Stack>
                ) : (
                  <>
                    {isLoggedIn ? <EditProfile /> : <FollowProfile />}
                    {isLoggedIn ? <GoLiveButton /> : <MessageUser />}
                  </>
                )}
              </Grid>
                    </Stack>
                </Grid>
              </Grid>
              <Grid item xs={8} sx={{color:'white', width:'100%'}}>
                <Grid container sx={{minHeight:'100%', pr:'20px'}}>
                  <Stack spacing={2} justifyContent={'center'} sx={{width:'100%'}}>
                    <Card sx={{width:'100%', p:'20px'}}>
                      <Bio/>
                      <Topics/>
                    </Card>
                      {/* <EditInfoForm/> */}
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