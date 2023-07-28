import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack, Switch, Typography, useMediaQuery }  from '@mui/material'
import { toggleIsDeactivated, toggleIsPrivate } from '../../../redux/preferences/preferences.actions'
import { useThemeContext } from '../../../theme/ThemeContextProvider'
import SavePreferencesButton from './SavePreferencesButton'
import LanguageAutocomplete from './LanguageAutocomplete'
import TopicsPool from './TopicsPool'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const MobileEditPreferencesForm = () => {

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

  const isSmallScreen = useMediaQuery("(max-width: 900px");
  const isSmallerScreen = useMediaQuery('(max-width: 550px)');
  const isXtraSmallScreen = useMediaQuery('(max-width: 420px)');
  const isMobileScreen = useMediaQuery('(max-width: 390px)');


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
      <Stack spacing={1} sx={{width:isMobileScreen ? ('200px') : isXtraSmallScreen ? ('280px'): ('300px')}} >
      <LanguageAutocomplete/>
        <Stack direction='row' >
        <Stack spacing={1} display={'flex'} justifyContent={'space-between'} sx={{w:'100%', alignItems:'center'}}>
        <Stack direction='row' spacing={1} justifyContent={isSmallerScreen ? 'flex-start' : 
        'space-between'} 
        sx={{width:'280px', alignItems:'center'}}>
        {isPrivate ? <Box display={'flex'} 
            sx={{justifyContent:'flex-end', 
              alignItems:'center'}}>
              <LockIcon sx={{color:'red', fontSize:'24px', ':hover': {color: isSmallerScreen ? 'green' : ''}}} onClick={isSmallerScreen ? handleMakePrivate : undefined}/>
          </Box> : <Box display={'flex'} 
                    sx={{justifyContent:'flex-end', 
                          alignItems:'center'}}>
              <LockOpenIcon sx={{color:'green', fontSize:'24px', ':hover': {color: isSmallerScreen ? 'red' : ''}}} onClick={isSmallerScreen ? handleMakePrivate : undefined}/>
                          </Box>}
      <Typography variant='caption' >
      Make your streams private?
      </Typography>
      {isSmallerScreen ? ('') : (<Switch 
      checked={makePrivate}
      onChange={handleMakePrivate}
      color='primary'
      sx={switchStyles}
      />)}
      
      {isSuccess ? <CheckCircleOutlineIcon sx={{color:'green'}} /> : ''}
      </Stack>
      <Stack direction='row' spacing={1} justifyContent={isSmallerScreen ? 'flex-start' : 
        'space-between'}  sx={{width:'280px', alignItems:'center'}}>
      {isDeactivated ? <Box display={'flex'} 
                  sx={{justifyContent:'flex-end', 
                    alignItems:'center'}}>
                  <PowerSettingsNewIcon sx={{color:'red', fontSize:'24px',':hover': {color: isSmallerScreen ? 'green' : ''}}} onClick={isSmallerScreen ? handleDeactivation : undefined}/>
                </Box> : <Box display={'flex'} 
                            sx={{justifyContent:'flex-end', 
                              alignItems:'center'}} >
                            <PowerSettingsNewIcon sx={{color:'green', fontSize:'24px', ':hover': {color: isSmallerScreen ? 'red' : ''}}} onClick={isSmallerScreen ? handleDeactivation : undefined}/>
                          </Box>}
                          <div style={{transform:isSmallerScreen ? '' : 'translateX(-20px)'}}>
						<Typography variant='caption'>
							Deactivate Account?
						</Typography>
            </div>
            {isSmallerScreen ? ('') : (<Switch 
							checked={deactivate}
							onChange={handleDeactivation}
							color='primary'
							sx={switchStyles}
						/>)}
						{isSuccess ? <CheckCircleOutlineIcon sx={{color:'green'}}/> : ''}
						</Stack>
            <TopicsPool/>
					</Stack>
				</Stack>
				<Box display={'flex'} justifyContent={'center'} sx={{transform:'translateY(10px)'}}  >
      {/* SAVE PREFERENCES */}
        <SavePreferencesButton />
      </Box>
			</Stack>
    </Box>
  )
}

export default MobileEditPreferencesForm