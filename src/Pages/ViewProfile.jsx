import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { removeProfileFromViews } from '../redux/user/user.actions'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MessageBarLayout from '../layouts/MessageBarLayout'
import ProfileInfoLayout from '../layouts/ProfileInfoLayout'

const ViewProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.user.defaultUser?.id);
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id);
  const firstName = useSelector((state) => state.user.defaultUser?.firstName);
  const lastName = useSelector((state) => state.user.defaultUser?.lastName);
  const userName = useSelector((state) => state.user.defaultUser?.userName);
  const imgUrl = useSelector((state) => state.user.defaultUser?.imgUrl)
  const bio = useSelector((state) => state.user.defaultUser?.bio)
  const country = useSelector((state) => state.user.defaultUser?.country)
  const city = useSelector((state) => state.user.defaultUser?.city)
  const state = useSelector((state) => state.user.defaultUser?.state)

    useEffect(() => {
    // Remove the profile from the list of logged-in user's openProfiles when the component unmounts
    return () => {
      dispatch(removeProfileFromViews(id));
    };
  }, [id]);

  useEffect(() => {
    console.log(loggedInUserId,'is the logged in');
    console.log(id,'is the viewed user');
  },[])

  return (
    <Box sx={{height:'100%', width:'100%'}}>
    {/* SIDE BAR MESSAGING */}
      <Grid container sx={{marginTop: isLoggedIn ? '55px' : ''}}>
        <MessageBarLayout/>
        <Grid item xs={8} sm={9} md={10}>
          <ProfileInfoLayout viewUserId={id}/>
        </Grid>
      </Grid>
    </Box>

  )
}

export default ViewProfile