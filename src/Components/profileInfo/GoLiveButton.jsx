import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import HostIcon from '../icons/HostIcon'
import { useMediaQuery } from '@mui/material'

const GoLiveButton = () => {

	const { theme } = useThemeContext();
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)

  const goLiveButton = {
    backgroundColor:theme.palette.background.fab.upload,
    height: '36px',
    '&:hover': {
      backgroundColor: theme.palette.text.primary, color:'black' 
      }
  }

  const goLiveButtonSmall = {
    width: '127px',
    backgroundColor:theme.palette.background.fab.upload,
    height: '36px',
    '&:hover': {
      backgroundColor: theme.palette.background.login,
      }
  }

	const goLiveText = { 
		fontFamily:`'Bungee Hairline', cursive`, 
		fontWeight:'700',
    marginRight:'8px',
    color: theme.palette.text,
    WebkitTextStrokeWidth: '2px', 
		WebkitTextStrokeColor:`${theme.palette.text}`,
    '&:hover': {
    color: 'white', // Text color on hover
  }
}
	
  return (
    <Box >
    {isSmallScreen ? (<Button sx={goLiveButtonSmall}>
			<Typography variant='subtitle2' sx={goLiveText}>
				Go Live
				</Typography>
        <HostIcon width={'24px'} height={'24px'} />
			</Button>) : (<Button sx={goLiveButton}>
			<Typography variant='subtitle2' sx={goLiveText}>
				Go Live
				</Typography>
        <HostIcon width={'24px'} height={'24px'} />
			</Button>)
    }
    </Box>
  )
}

export default GoLiveButton