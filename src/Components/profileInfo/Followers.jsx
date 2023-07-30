import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import { fetchFollowersThunk } from '../../redux/user/user.actions'

const Followers = () => {

  const { theme } = useThemeContext();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.defaultUser?.id)
  const user = useSelector((state) => state.user.defaultUser)
  const loggedInUserFollowers = useSelector((state) => state.user.defaultUser?.followers?.length)
  const loggedInUserHasFollowers = useSelector((state) => state.user.defaultUser?.followers?.length > 0)
  const followersStyle = {
    color: theme.palette.text.primary,
    fontFamily: `'Roboto Condensed', sans-serif`
  }

  useEffect(() => {
    dispatch(fetchFollowersThunk(userId))
    console.log(user,'is the logged in USER')
    console.log(userId,'is the logged in user id')
  },[userId])

  useEffect(() => {
    console.log(loggedInUserFollowers, 'is the number of followers from the Followers react frontend')
  },[loggedInUserFollowers])

  return (
    <Box sx={{display:'flex', justifyContent: 'center'}}>
      <Typography variant='subtitle2' sx={followersStyle}>
      {loggedInUserHasFollowers ? loggedInUserFollowers : '0'} followers
      </Typography>
    </Box>
  )
}

export default Followers