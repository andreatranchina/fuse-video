import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const UserLocation = () => {

  const { theme } = useThemeContext();
  const [flagEmoji, setFlagEmoji] = useState('')
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.defaultUser);
  const loggedInCity = useSelector((state) => state.user.defaultUser?.city);
  const loggedInState = useSelector((state) => state.user.defaultUser?.state);
  const loggedInCountry = useSelector((state) => state.user.defaultUser?.country);

  const location = {
    color: theme.palette.text.primary,
    fontFamily: `'Roboto Mono', monospace`
  }

 
  useEffect(() => {
    if (loggedInCountry) {
      const countryFlag = [...loggedInCountry.toUpperCase()].map(char => 
      String.fromCodePoint(127397 + char.charCodeAt())
  ).reduce((a, b) => `${a}${b}`);
      setFlagEmoji(countryFlag);
      console.log(countryFlag,'is the country flag of the user');
      console.log(user,'is the user\'s profile');
    }
  },[loggedInCountry])

  return (
    <Box sx={{display:'flex', justifyContent: 'center'}}>
      <Typography variant='subtitle1' sx={location}>
          {loggedInCity}, {loggedInState} {flagEmoji}
      </Typography>
    </Box>
  )
}

export default UserLocation