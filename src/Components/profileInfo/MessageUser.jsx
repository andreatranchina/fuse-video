import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MessageIcon from '@mui/icons-material/Message';
import { useThemeContext } from '../../theme/ThemeContextProvider'

const MessageUser= () => {

	const { theme } = useThemeContext();

  const messageButton = {
    backgroundColor:theme.palette.button.main,
    '&:hover': {
      backgroundColor: theme.palette.background.fab.hover, color:'black' 
      }
  }

	const messageText = { 
		fontFamily:`'Bungee Hairline', cursive`, 
		fontWeight:'700',
    paddingRight:'10px'
	}
	
  return (
    <Box >
    	<Button sx={messageButton}>
			<Typography variant='subtitle2' sx={messageText}>
				Message
				</Typography>
        <MessageIcon/>
			</Button>
    </Box>
  )
}

export default MessageUser