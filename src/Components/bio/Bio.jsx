import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const Bio = () => {

  const { theme } = useThemeContext();
  const firstName = useSelector((state) => state.user.defaultUser?.firstName);
  const lastName = useSelector((state) => state.user.defaultUser?.lastName);
  const bio = useSelector((state) => state.user.defaultUser?.bio)
  const [nameInPixels,setNameInPixels] = useState('')

  const titleStyle = {
    fontFamily:`'Roboto mono', monospace`, 
  }

  const bioStyle = {
    fontFamily:`'Roboto Flex', sans-serif`,
    fontWeight:200
  }

  

  useEffect(() => {
  //h5 elements are 13.28px each 
  const firstNameLength = firstName?.length ?? 0;
  const lastNameLength = lastName?.length ?? 0;
  const spaceWidth = 6; // Approximate width for a space in pixels
  const pixelString = (firstNameLength + lastNameLength + spaceWidth) * 11.28;
  setNameInPixels(pixelString);
  console.log(pixelString, 'pixel string');
}, [firstName, lastName]);

  return (
    <Box >
    <Typography variant='h5' sx={titleStyle}>
      {firstName} {lastName}
    </Typography>
    <Divider sx={{ width: nameInPixels, height: '5px', marginBottom: '5px' }} />
    <Typography sx={bioStyle}>
        {bio}
    </Typography>
    </Box>
  )
}

export default Bio