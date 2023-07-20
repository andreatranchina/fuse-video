import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import HostIcon from '../icons/HostIcon'

const GoLiveButton = () => {

	const { theme } = useThemeContext();

  const goLiveButton = {
    backgroundColor:theme.palette.background.fab.upload,
    height: '36px',
    '&:hover': {
      backgroundColor: theme.palette.background.fab.hover, color:'black' 
      }
  }

	const goLiveText = { 
		fontFamily:`'Bungee Hairline', cursive`, 
		fontWeight:'700',
    marginRight:'8px'
	}
	
  return (
    <Box >
    	<Button sx={goLiveButton}>
			<Typography variant='subtitle2' sx={goLiveText}>
				Go Live
				</Typography>
        <HostIcon width={'24px'} height={'24px'} />
			</Button>
    </Box>
  )
}

export default GoLiveButton