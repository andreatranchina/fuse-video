import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Paper, Stack, Typography } from '@mui/material'
import EditProfileFormButton from './EditProfileFormButton'
import { useThemeContext } from '../../../theme/ThemeContextProvider'

const ProfileDetails = () => {

  const { theme, mode } = useThemeContext()
  const [flagEmoji, setFlagEmoji] = useState('')
  const bio = useSelector((state) => state.user.defaultUser?.bio)
  const country = useSelector((state) => state.user.defaultUser?.country)
  const city = useSelector((state) => state.user.defaultUser?.city)
  const state = useSelector((state) => state.user.defaultUser?.state)
  const topics = useSelector ((state) => state.user.defaultUser?.topics)

  useEffect(() => {
    if (country) {
      const countryFlag = [...country.toUpperCase()].map(char => 
      String.fromCodePoint(127397 + char.charCodeAt())
  ).reduce((a, b) => `${a}${b}`);
      setFlagEmoji(countryFlag);
      // console.log(countryFlag,'is the country flag of the user');
      // console.log(user,'is the user\'s profile');
    }
  },[country])

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Stack spacing={4} sx={{ width: '600px' }}>
        <Stack direction="row" spacing={2} display={'flex'} justifyContent={'space-between'} sx={{ w: '100%' }}>
          <Paper sx={{height:160, backgroundColor: mode === 'light' ? theme.palette.background.fab.default : theme.palette.background.fab.hover,display:'flex', alignItems:'center', paddingLeft:'10px'}}>
            <Typography sx={{fontFamily:`'Roboto mono', monospace`, paddingLeft:'10px', color:theme.palette.text.primary }}>
                Bio: {bio} <Box>{flagEmoji}</Box>
            </Typography>
          </Paper>
          <Stack spacing={2} display={'flex'} justifyContent={'space-evenly'} sx={{ w: '100%' }}>
          <Box sx={{ minWidth: 120 }}>
            <Paper sx={{height:70, backgroundColor: mode === 'light' ? theme.palette.background.fab.default : theme.palette.background.fab.hover,display:'flex', alignItems:'center', paddingLeft:'10px'}}>
              <Typography sx={{fontFamily:`'Roboto mono', monospace`, paddingLeft:'10px', color:theme.palette.text.primary }}>
                  {city}
                </Typography>
                </Paper>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <Paper sx={{height:70, backgroundColor: mode === 'light' ? theme.palette.background.fab.default : theme.palette.background.fab.hover,display:'flex', alignItems:'center', paddingLeft:'10px'}}>
              <Typography sx={{fontFamily:`'Roboto mono', monospace`, paddingLeft:'10px', color:theme.palette.text.primary }}>
                {state}
                </Typography>
              </Paper>
            </Box>
          </Stack>
        </Stack>
        <Box display={'flex'} justifyContent={'center'} sx={{ transform: 'translateY(20px)' }}>
          <EditProfileFormButton/>
        </Box>
      </Stack>
    </Box>
  )
}

export default ProfileDetails