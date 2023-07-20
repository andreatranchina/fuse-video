import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import EditIcon from '@mui/icons-material/Edit';

const EditProfile= () => {

	const { theme } = useThemeContext();

  const editButton = {
    backgroundColor:theme.palette.button.main,
    '&:hover': {
      backgroundColor: theme.palette.background.fab.hover, color:'black' 
      }
  }

	const editText = { 
		fontFamily:`'Bungee Hairline', cursive`, 
		fontWeight:'700',
        marginRight:'8px'
	}
	
  return (
    <Box sx={{backgroundColor:'black', marginRight:'10px'}}>
    	<Button sx={editButton}>
			<Typography variant='subtitle2' sx={editText}>
				Edit Profile
				</Typography>
                <EditIcon />
			</Button>
    </Box>
  )
}

export default EditProfile