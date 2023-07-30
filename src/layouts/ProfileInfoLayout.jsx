import React, { useEffect } from 'react'
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

const ProfileInfoLayout = ({loggedInUserId,viewUserId}) => {

  const isLoggedIn = useSelector((state) => !!state.user.defaultUser?.id);
  const isOwnProfile = loggedInUserId === Number(viewUserId);
 //boolean true if is accessing user from params id, false if not
  // const isLoggedIn = true;
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const isEditing = useSelector((state) => !state.user.defaultUser?.isEditingAccount)
  
  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
  console.log('isOwnProfile:', isOwnProfile);
  console.log(loggedInUserId,'loggedin userid')
  console.log(viewUserId,'viewuser id')
  },[])

   //if the pro
  return (
     <Stack>
          {/* PROFILE PIC AND BIO */}
            <Grid container sx={{color:'white', flexGrow: 1 }}>
              <Grid item xs={4} sx={{color:'white', height:'55vh'}}>
                <Grid container sx={{minHeight:'100%', justifyContent:'center', alignItems:'center'}}>
                    <Grid item sx={{marginTop:'-40px'}}>
                      <UserBanner viewUserId={viewUserId}/>
                    </Grid>
                    <Stack>
                    <Grid item sx={{marginTop:'-100px'}}>
                    {/* NEED TO PASS " IS LIVE " SO AS TO HAVE THE VIEWER JOIN THE LIVESTREAM */}
                      {isLoggedIn && isOwnProfile ? (<UploadProfilePhoto/>) : (<NowLive viewUserId={viewUserId}/>)}
                      <ProfilePhoto viewUserId={viewUserId}/>
                    </Grid>
                    <Grid item sx={{margin:'10px', transform:'translateY(-20px)'}}>
                      <UserLocation viewUserId={viewUserId}/>
                      <Followers viewUserId={viewUserId}/>
                    </Grid>
                    {/* The buttons should lay on top of one another if the screen gets to 900px and below until mobile screen size is reached*/}
                      <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                {isSmallScreen ? (
                  <Stack spacing={1} >
                    {isLoggedIn && isOwnProfile ? <EditProfile /> : <FollowProfile viewUserId={viewUserId}/>}
                    {isLoggedIn && isOwnProfile ? <GoLiveButton /> : <MessageUser viewUserId={viewUserId}/>}
                  </Stack>
                ) : (
                  <>
                    {isLoggedIn && isOwnProfile ? <EditProfile /> : <FollowProfile viewUserId={viewUserId}/>}
                    {isLoggedIn && isOwnProfile ? <GoLiveButton /> : <MessageUser viewUserId={viewUserId}/>}
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
                      <Bio viewUserId={viewUserId}/>
                      <Topics viewUserId={viewUserId}/>
                    </Card>
                      {/* <EditInfoForm/> */}
                  </Stack>
                </Grid>
              </Grid>
              {/* PAST STREAMS */}
              <Grid container>
                <Grid item xs={12} sx={{backgroundColor:'orange', height:'45vh'}}>
                  <StreamHistory viewUserId={viewUserId}/>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
  )
}

export default ProfileInfoLayout