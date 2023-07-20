import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const FollowProfile = () => {

	const { theme } = useThemeContext();

	const followButton = {
		backgroundColor:theme.palette.button.main,
	}

	const followText = { 
		fontFamily:`'Bungee Hairline', cursive`, 
		fontWeight:'700'
	}

  return (
    <Box sx={{backgroundColor:'black'}}>
    	<Button sx={followButton}>
			<Typography variant='subtitle2' sx={followText}>
				Follow 
				</Typography>
			</Button>
    </Box>
  )
}

export default FollowProfile