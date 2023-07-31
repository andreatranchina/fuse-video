import React, {useEffect} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import AddIcon from '@mui/icons-material/Add'
import { fetchFollowersThunk, fetchFollowingsThunk } from '../../redux/user/user.actions'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import RemoveIcon from '@mui/icons-material/Remove';

const FollowProfile = ({viewUserId}) => {
	const loggedInUserId = useSelector((state) => state.user.defaultUser?.id);
	const followingIds = useSelector(state => state.user.followingIds);
	const followersIds = useSelector(state => state.user.followersIds);

	const { theme } = useThemeContext();
	const dispatch = useDispatch();

	const followButton = {
		width: '119px',
		backgroundColor:theme.palette.background.fab.upload,
		'&:hover': {
      backgroundColor: theme.palette.background.fab.hover, color:'black' 
      }
	}

	const followText = { 
		fontFamily:`'Bungee Hairline', cursive`, 
		fontWeight:'700', paddingRight:'8px'
	}

	// useEffect(() => {
		// dispatch(fetchFollowingsThunk(loggedInUserId));
		// dispatch(fetchFollowersThunk(viewUserId));
	// 	console.log("followingIds: " + followingIds);
	// 	console.log("followerIds: " + followersIds);
	
	//   }, []);
	

	const handleFollow = async () => {
		try {
			console.log("loggedInUserId: " + loggedInUserId);
			console.log("viewUserId: " + viewUserId )
			await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/follows/`, {
			  loggedInUserId,
			  userId: viewUserId,
			});
	  
			console.log('followed user:', viewUserId);
		  } catch (error) {
			console.error('error following user:', error.message);
		  }
		  dispatch(fetchFollowingsThunk(loggedInUserId));
		  dispatch(fetchFollowersThunk(viewUserId));
	}

	const handleUnfollow = async (userId) => {
		try {
		  await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/follows/`, {
			data: {
			  loggedInUserId,
			  userId: viewUserId,
			},
		  });
	
		  console.log('unfollowed user:', userId);
		} catch (error) {
		  console.error('error unfollowing user:', error.message);
		}
		dispatch(fetchFollowersThunk(viewUserId));
		dispatch(fetchFollowingsThunk(loggedInUserId));
	  };


  return (
    <Box 
		onClick={followersIds.includes(loggedInUserId)? () => handleUnfollow(viewUserId) : () => handleFollow(viewUserId)}
		sx={{marginRight:'10px'}}>
    	<Button sx={followButton}>
			<Typography variant='subtitle2' sx={followText}>
			{followersIds.includes(loggedInUserId)?"Unfollow":"Follow"}
				</Typography>
				{followersIds.includes(loggedInUserId)?<RemoveIcon/>:<AddIcon />}
			</Button>
    </Box>
  )
}

export default FollowProfile