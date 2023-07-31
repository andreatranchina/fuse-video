import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'
import { useThemeContext } from '../../../theme/ThemeContextProvider'
import { editAccountThunk, fetchUserByIdThunk } from '../../../redux/user/user.actions'
import { editPreferredLanguage, submitPreferencesSuccess, submitPreferencesFail, flagPreferencesErrors, unflagPreferencesErrors, toggleIsDeactivated, toggleIsPrivate, deleteTopic } from '../../../redux/preferences/preferences.actions'
import { editAccountField } from '../../../redux/account/account.actions'


const SaveAccountButton = () => {
	const dispatch = useDispatch();
	const { language, isDeactivated, isPrivate, topics, errors, isSuccess } = useSelector((state) => state.preferences)
	const userId = useSelector((state) => state.user.defaultUser?.id)
	const { theme } = useThemeContext();

  const hasWhiteSpace = (entry) => {
    const whitespaceRegex = /[ \t\n\r]/;
    return whitespaceRegex.test(entry)
  }

  const handleSetPreferredLanguage = async() => {
    if (language === '' || hasWhiteSpace(language)){
    //get user's first name from database and input into preferences redux
     dispatch(flagPreferencesErrors({ language: 'Please choose your language'})) 
    } else {
    dispatch(editPreferredLanguage(language))
    }
  }

  const handleSave =  async (e) => {
    handleSetPreferredLanguage();
    //send data and turn on preferences success state
    if (!errors.language && !errors.topics){
      const editedAccount = {
        language: language,
        isDeactivated: isDeactivated,
        isPrivate: isPrivate,
        topics: topics
      }
      console.log(editedAccount)
      await dispatch(editAccountThunk(userId, editedAccount));
      dispatch(submitPreferencesSuccess());
      dispatch(fetchUserByIdThunk(userId));
    } else {
      dispatch(submitPreferencesFail());
      dispatch(unflagPreferencesErrors());
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

export default SaveAccountButton
