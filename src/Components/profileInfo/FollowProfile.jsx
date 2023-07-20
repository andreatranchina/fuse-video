import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import AddIcon from '@mui/icons-material/Add'

const FollowProfile = () => {

	const { theme } = useThemeContext();

	const followButton = {
		backgroundColor:theme.palette.background.fab.upload,
		'&:hover': {
      backgroundColor: theme.palette.background.fab.hover, color:'black' 
      }
	}

	const followText = { 
		fontFamily:`'Bungee Hairline', cursive`, 
		fontWeight:'700', paddingRight:'8px'
	}

  return (
    <Box sx={{marginRight:'10px'}}>
    	<Button sx={followButton}>
			<Typography variant='subtitle2' sx={followText}>
				Follow 
				</Typography>
				<AddIcon/>
			</Button>
    </Box>
  )
}

export default FollowProfile