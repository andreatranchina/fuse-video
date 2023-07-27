import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'
import { useThemeContext } from '../../../theme/ThemeContextProvider'
import { editAccountThunk, fetchUserByIdThunk } from '../../../redux/user/user.actions'
import { editProfileField, submitProfileSuccess, submitProfileFail, flagProfileErrors } from '../../../redux/profile/profile.actions'
import { parsePhoneNumber, isValidNumber } from 'libphonenumber-js';


const SaveProfileButton = () => {
  const dispatch = useDispatch();
  const { bio, city, currentState, errors, isSuccess } = useSelector((state) => state.profile)
  const userId = useSelector((state) => state.user.defaultUser?.id)
  const oldBio = useSelector((state) => state.user.defaultUser?.bio)
  const { theme } = useThemeContext();

  const hasWhiteSpace = (entry) => {
    const whitespaceRegex = /[ \t\n\r]/;
    return whitespaceRegex.test(entry)
  }

  const handleBioSave = async() => {
    const bioLength = bio.length
    if (bioLength > 100){
        dispatch(flagProfileErrors({ bio: 'Keep your bio under 100 characters'})) 
    }
    if (bio === '' || hasWhiteSpace(bio)){
    //get user's first name from database and input into form redux
        dispatch(flagProfileErrors({ bio: 'Write a short bio'})) 
    } else {
        dispatch(editProfileField('bio', bio))
    }
  }

  const handleCitySave = async() => {
    if (city === '') {
        dispatch(flagProfileErrors({ email: 'Choose your city'})) 
    } else {
        dispatch(editProfileField('city', city))
    }
  }

  const handleCurrentStateSave = async() => {
    if (currentState === ''){
    dispatch(editProfileField('currentState', currentState))
    }
  }

  const handleSave =  async (e) => {
    handleBioSave();
    handleCitySave();
    handleCurrentStateSave();

    //send data and turn on form success state
    if (!errors.bio && !errors.city){
      console.log(`still went through`);
      const editedProfile = {
        bio: bio,
        city: city,
        state: currentState
      }
      console.log(editedProfile)
      await dispatch(editAccountThunk(userId, editedProfile));
      dispatch(submitProfileSuccess());
      dispatch(fetchUserByIdThunk(userId));
    } else {
      dispatch(submitProfileFail());
      dispatch(flagProfileErrors({bio:'',city:'',state:''}))
    }
  }

  
  return (
    <>
			<Button onClick={handleSave} 
				sx={{ maxWidth: '200px', 
							maxHeight: '30px', 
							minWidth: '200px', 
							minHeight: '30px', 
							color:`${theme.palette.button.main}`, 
							border:`2px solid ${theme.palette.button.main}`, 
							'&:hover': { 
								backgroundColor:`${theme.palette.button.main}`, 
								color:`${theme.palette.background.paper}`, 
								border:`2px solid ${theme.palette.button.main}`} 
				}}>
					<Typography 
						sx={{fontFamily:`'Bungee Hairline', cursive`, 
								fontWeight:700,  
                width: '100%',
								WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:`${theme.palette.button.main}`,
								':hover':{
									WebkitTextStrokeColor:`${theme.palette.background.fab.hover}`}}}>
							Save
					</Typography>
			</Button>
      
    </>
  )
}

export default SaveProfileButton