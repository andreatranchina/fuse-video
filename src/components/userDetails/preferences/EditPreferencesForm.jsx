import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography }  from '@mui/material'
import { toggleIsDeactivated, toggleIsPrivate } from '../../../redux/preferences/preferences.actions'
import { useThemeContext } from '../../../theme/ThemeContextProvider'
import SavePreferencesButton from './SavePreferencesButton'
import LanguageAutocomplete from './LanguageAutocomplete'
import TopicsPool from './TopicsPool'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const EditPreferencesForm = () => {

	const { theme } = useThemeContext()
	const switchStyles = {
    '& .MuiSwitch-root': {
      // Change the background color of the Switch when it's not checked
      backgroundColor: 'rgba(255, 0, 0, 0.5)', // Replace with your desired background color
    },
    '& .MuiSwitch-thumb': {
      // Change the color of the Switch button (thumb) when it's not checked
      backgroundColor: 'yellow', // Replace with your desired button color
    },
    '& .MuiSwitch-track': {
      // Change the color of the Switch track when it's not checked
      backgroundColor: 'rgba(0, 255, 0, 0.3)', // Replace with your desired track color
    },
    '& .MuiSwitch-root.Mui-checked': {
      // Change the background color of the Switch when it's checked
      backgroundColor: 'rgba(0, 0, 255, 0.5)', // Replace with your desired background color
    },
    '& .MuiSwitch-thumb.Mui-checked': {
      // Change the color of the Switch button (thumb) when it's checked
      backgroundColor: 'blue', // Replace with your desired button color
    },
    '& .MuiSwitch-track.Mui-checked': {
      // Change the color of the Switch track when it's checked
      backgroundColor: 'rgba(255, 255, 0, 0.3)', // Replace with your desired track color
    },
  };

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
		justifyContent={'center'}
		>
			<Stack spacing={4} sx={{width:'600px', display:'flex', justifyContent:'center', alignItems:'center'}}>
				<LanguageAutocomplete/>
				<Stack direction='row' spacing={1} >
					<Stack spacing={2} display={'flex'} justifyContent={'space-between'} sx={{w:'100%', alignItems:'center'}}>
						<Stack direction='row' spacing={1} sx={{width:'280px'}}>
						{isPrivate ? <Box display={'flex'} 
							sx={{justifyContent:'flex-end', 
								alignItems:'center'}}>
							<LockIcon sx={{color:'red', fontSize:'48px'}}/>
							</Box> : <Box display={'flex'} 
								sx={{justifyContent:'flex-end', 
										alignItems:'center'}}>
								<LockOpenIcon sx={{color:'green', fontSize:'48px'}}/>
							</Box>}
							<Typography variant='subtitle1' >
								Make your streams private?
							</Typography>

						<Switch 
							checked={makePrivate}
							onChange={handleMakePrivate}
							color='primary'
							sx={switchStyles}
						/>
				{isSuccess ? <CheckCircleOutlineIcon sx={{color:'green'}}/> : ''}
			</Stack>
			<Stack direction='row' spacing={1} sx={{width:'280px'}}>
				{isDeactivated ? <Box display={'flex'} 
					sx={{justifyContent:'flex-end', alignItems:'center'}}>
					<PowerSettingsNewIcon sx={{color:'red', fontSize:'48px'}}/>
						</Box> : <Box display={'flex'} 
								sx={{justifyContent:'flex-end', 
								alignItems:'center'}}>
							<PowerSettingsNewIcon sx={{color:'green', fontSize:'48px'}}/>
							</Box>}
								<Typography variant='subtitle1'>
									Deactivate Account?
								</Typography>
						<Switch 
							checked={deactivate}
							onChange={handleDeactivation}
							color='primary'
							sx={switchStyles}
						/>
					{isSuccess ? <CheckCircleOutlineIcon sx={{color:'green'}}/> : ''}
				</Stack>
				<Box sx={{backgroundColor:'red', width:'200px'}}></Box>
			</Stack>
		</Stack>
			<Box display={'flex'} justifyContent={'center'} sx={{transform:'translateY(-20px)'}}  >
			{/* SAVE PREFERENCES */}
			<SavePreferencesButton />
			</Box>
		</Stack>
		</Box>
	)
}

export default EditPreferencesForm
