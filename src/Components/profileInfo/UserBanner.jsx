import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import { useMediaQuery } from '@mui/material'

const UserBanner = () => {
  const dispatch = useDispatch()
  const { theme } = useThemeContext()
  const isSmallScreen = useMediaQuery('(max-width: 900px)');
  const loggedInId= useSelector((state) => state.user.defaultUser?.id)
  const loggedInUserName = useSelector((state) => state.user.defaultUser?.userName)

  const userName = {
    fontFamily:`'Bungee Hairline',monospace`, fontWeight:'700', marginTop:'18px',
    color: theme.palette.text.primary
  }

  useEffect(() => {
    console.log(loggedInUserName,'username from userbanner')
  },[loggedInUserName])
  return (
    <Box >
      <Typography variant={isSmallScreen ? ('h5') : ('h4')} sx={userName}>
          {loggedInUserName}
      </Typography>
    </Box>
  )
}

export default UserBanner