import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Paper, Stack, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import EditPreferencesButton from './EditPreferencesButton'
import { useThemeContext } from '../../../theme/ThemeContextProvider'

const languagesAvailable = [
		{
			name: 'English',
			shortName:'EN'
		},
		{
			name: 'Spanish',
			shortName:'ES'
		},
		{
			name: 'French',
			shortName:'FR'
		},
		{
			name: 'German',
			shortName:'DE'
		},
		{
			name: 'Japanese',
			shortName:'JA'
		},
		{
			name: 'Italian',
			shortName:'IT'
		},
		{
			name: 'Polish',
			shortName:'PL'
		},
		{
			name: 'Dutch',
			shortName:'NL'
		}
	]

const PreferencesDetails = () => {
	const { theme, mode } = useThemeContext();
	const language = useSelector((state) => state.user.defaultUser?.language)
	const isDeactivated = useSelector((state) => state.user.defaultUser?.isDeactivated)
	const isPrivate = useSelector((state) => state.user.defaultUser?.isPrivate)
	const [myLanguage, setMyLanguage] = useState('')

	useEffect(() => {
    const foundLanguage = languagesAvailable.find((lang) => lang.shortName === language);
    if (foundLanguage) {
      setMyLanguage(foundLanguage.name);
    } else {
      setMyLanguage('Language not found');
    }
  }, [language]);

  return (
    <Box 
		component='form'
		autoComplete='off'
		display={'flex'}
		justifyContent={'center'}
		>
			<Stack spacing={4} sx={{width:'600px', display:'flex', justifyContent:'center', alignItems:'center'}}>
			<Stack direction='row' spacing={1}>
			<Paper style={{ height: 65, backgroundColor: mode === 'light' ? theme.palette.background.fab.default : theme.palette.background.fab.hover,display:'flex', alignItems:'center', padding:'12px'}}>
				<Typography sx={{fontWeight:700, marginRight:'10px', color:theme.palette.text.primary}}>
					{myLanguage} 
				</Typography>
				<Typography sx={{color:theme.palette.text.primary}}>
					is the set language for your account
				</Typography>
				</Paper>
				</Stack>
				<Stack direction='row'>
					<Stack spacing={2} display={'flex'} sx={{w:'100%', alignItems:'center'}}>
					<Paper style={{ height: 65, backgroundColor: mode === 'light' ? theme.palette.background.fab.default : theme.palette.background.fab.hover,display:'flex', alignItems:'center', padding:'12px'}}>
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
							<Typography variant='subtitle1' sx={{color:theme.palette.text.primary}}>
								{isPrivate ? 'Your streams are set to private mode' : 'Your streams are currently public'}
							</Typography>
							
			</Stack>
			</Paper>
			<Paper style={{ height:65, backgroundColor: mode === 'light' ? theme.palette.background.fab.default : theme.palette.background.fab.hover,display:'flex', alignItems:'center', padding:'12px'}}>
			<Stack direction='row' spacing={1} sx={{width:'280px'}}>
				{isDeactivated ? <Box display={'flex'} 
					sx={{justifyContent:'flex-end', alignItems:'center'}}>
					<PowerSettingsNewIcon sx={{color:'red', fontSize:'48px'}}/>
						</Box> : <Box display={'flex'} 
								sx={{justifyContent:'flex-end', 
								alignItems:'center'}}>
							<PowerSettingsNewIcon sx={{color:'green', fontSize:'48px'}}/>
							</Box>}
							<Box>
								<Typography variant='subtitle1' sx={{marginTop:'10px', textAlign:'center', color:theme.palette.text.primary}}>
									{isDeactivated ? 'Your account is currently deactivated' : 'Your account is active'}
								</Typography>
								</Box>
				</Stack>
				</Paper>
				<Box sx={{backgroundColor:'red', width:'200px'}}></Box>
			</Stack>
		</Stack>
			<Box display={'flex'} justifyContent={'center'} sx={{transform:'translateY(-20px)'}}  >
			{/* SAVE PREFERENCES */}
			<EditPreferencesButton />
			</Box>
		</Stack>
		</Box>
  )
}

export default PreferencesDetails