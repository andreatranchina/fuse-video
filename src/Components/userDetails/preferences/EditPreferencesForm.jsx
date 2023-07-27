import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography }  from '@mui/material'
import { toggleIsDeactivated, toggleIsPrivate } from '../../../redux/preferences/preferences.actions'
import { useThemeContext } from '../../../theme/ThemeContextProvider'
import SavePreferencesButton from './SavePreferencesButton'
import LanguageAutocomplete from './LanguageAutocomplete'
import TopicsPool from './TopicsPool'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const EditPreferencesForm = () => {

  const dispatch = useDispatch();

  const { language, isDeactivated, isPrivate, errors, isSuccess } = useSelector((state) => state.preferences)
	const deactivate = useSelector((state) => state.preferences.isDeactivated)
	const makePrivate = useSelector((state) => state.preferences.isPrivate)
	const topics = useSelector((state) => state.preferences.topics)

	const handleDeactivation = () => {
		dispatch(toggleIsDeactivated());
	}

	const handleMakePrivate = () => {
		dispatch(toggleIsPrivate());
	}
  
  return (
    <Box 
			component='form'
			autoComplete='off'
			display={'flex'}
			justifyContent={'center'}>
			<Stack spacing={4} sx={{width:'600px'}}>
				<LanguageAutocomplete/>
					<Stack direction='row' spacing={2} display={'flex'} justifyContent={'space-between'} sx={{w:'100%'}}>
					{isPrivate ? (<Typography variant='subtitle1'>
							Make your streams public?
						</Typography>) : (<Typography variant='subtitle1'>
							Make your streams private?
						</Typography>)}
						<Switch 
							checked={makePrivate}
							onChange={handleMakePrivate}
							color='primary'
						/>
						{isSuccess ? <CheckCircleOutlineIcon sx={{color:'green'}}/> : ''}
						{isDeactivated ? (<Typography variant='subtitle1'>
							Reactivate Account?
						</Typography>) : (<Typography variant='subtitle1'>
							Deactivate Account?
						</Typography>)}
						
						<Switch 
							checked={deactivate}
							onChange={handleDeactivation}
							color='primary'
						/>
						{isSuccess ? <CheckCircleOutlineIcon sx={{color:'green'}}/> : ''}
				</Stack>
				<TopicsPool/>
				<Box display={'flex'} justifyContent={'center'} sx={{transform:'translateY(-20px)'}}  >
      {/* SAVE PREFERENCES */}
        <SavePreferencesButton />
      </Box>
				</Stack>
    </Box>
  )
}

export default EditPreferencesForm