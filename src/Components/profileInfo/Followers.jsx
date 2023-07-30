import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import { fetchFollowersThunk } from '../../redux/user/user.actions'

const Followers = ({viewUserId}) => {

  const { theme } = useThemeContext();
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)

  const followersIds = useSelector(state => state.user.followersIds);

  useEffect(() => {
    console.log("view user id" + viewUserId);
    dispatch(fetchFollowersThunk(viewUserId));
    console.log(followersIds);

  }, [viewUserId]);


  // const userId = useSelector((state) => state.user.defaultUser?.id)
  // const loggedInUserFollowers = useSelector((state) => state.user.defaultUser?.followers?.length)
  // const loggedInUserHasFollowers = useSelector((state) => state.user.defaultUser?.followers?.length > 0)

  // const isOwnProfile = loggedInUserId === Number(viewUserId); 

  // const viewUserHasFollowers = useSelector((state) => {
  //   const viewUser = state.user.openProfiles.find((profile) => profile.userId == viewUserId);
  //   return viewUser?.viewUserFollowers?.length > 0 || false;
  // });

//   const viewUserFollowers = useSelector((state) => {
//   const viewUser = state.user.openProfiles.find((profile) => profile.userId == viewUserId);
//   console.log(viewUser,' this is fetching all the users that folllow the person ');
//   return viewUser?.viewUserFollowers?.length || 0; // Assuming followers is the property holding the array of followers
// });


  // const followersCount = isOwnProfile
  // ? loggedInUserFollowers !== '' ? loggedInUserFollowers : (viewUserFollowers !== '' ? viewUserFollowers : 0)
  // : null;

  // useEffect(() => {
  //   if (isOwnProfile){
  //       dispatch(fetchFollowersThunk(loggedInUserId))
  //   // console.log(user,'is the logged in USER')
  //   // console.log(userId,'is the logged in user id')
  // }},[viewUserId])

  // useEffect(() => {
  //   console.log(loggedInUserId,'is the logged in');
  //   console.log(viewUserId,'is the viewed user');
  // },[])

  // useEffect(() => {
  //   console.log(loggedInUserFollowers, 'is the number of followers from the Followers react frontend')
  // },[loggedInUserFollowers])

  return (
    <Box sx={{display:'flex', justifyContent: 'center'}}>
      <Typography variant='subtitle2' sx={{color: theme.palette.text.primary, fontFamily: `'Roboto Condensed', sans-serif`}}>
      {/* {followersCount !== null ? followersCount : 0}  */}
      {followersIds? followersIds.length : 0} Followers
      </Typography>
    </Box>
    
  )
}

export default Followers