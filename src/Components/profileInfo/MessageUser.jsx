import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const MessageUser= () => {

	const { theme } = useThemeContext();

  const messageButton = {
    backgroundColor:theme.palette.button.main,
  }

	const messageText = { 
		fontFamily:`'Bungee Hairline', cursive`, 
		fontWeight:'700',
	}
	
  return (
    <Box sx={{backgroundColor:'black'}}>
    	<Button sx={messageButton}>
			<Typography variant='subtitle2' sx={messageText}>
				Message
				</Typography>
			</Button>
    </Box>
  )
}

export default MessageUser