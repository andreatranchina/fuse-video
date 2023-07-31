import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const Bio = ({viewUserId}) => {

  const { theme } = useThemeContext();
  const firstName = useSelector((state) => state.user.defaultUser?.firstName);
  const lastName = useSelector((state) => state.user.defaultUser?.lastName);
  const bio = useSelector((state) => state.user.defaultUser?.bio)
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)
  const isOwnProfile = loggedInUserId === Number(viewUserId); 
  const openProfiles = useSelector((state) => state.user.openProfiles);
  const thisUser = openProfiles.find((user) => user.id == viewUserId);
  const viewUserFirstName = thisUser?.firstName;
  const viewUserLastName = thisUser?.lastName;
  const viewUserBio = thisUser?.bio;
  const [nameInPixels,setNameInPixels] = useState('')  

  useEffect(() => {
    let firstNameLength, lastNameLength;
    if (isOwnProfile){
  //h5 elements are 13.28px each 
      firstNameLength = firstName?.length ?? 0;
      lastNameLength = lastName?.length ?? 0;
    } else {
      firstNameLength = viewUserFirstName?.length ?? 0;
      lastNameLength = viewUserLastName?.length ?? 0;
    }
  const spaceWidth = 6; // Approximate width for a space in pixels
  const pixelString = (firstNameLength + lastNameLength + spaceWidth) * 10;
  setNameInPixels(pixelString);
  console.log(pixelString, 'pixel string');
}, [firstName, lastName, viewUserFirstName, viewUserLastName]);

  return (
    <Box >
    <Typography variant='h5' sx={{fontFamily:`'Roboto mono', monospace`}}>
      {isOwnProfile ? `${firstName} ${lastName}` : `${viewUserFirstName} ${viewUserLastName}`}
    </Typography>
    <Divider sx={{ width: nameInPixels, height: '5px', marginBottom: '5px' }} />
    <Typography sx={{fontFamily:`'Roboto Flex', sans-serif`, fontWeight:200}}>
        {isOwnProfile ? bio : viewUserBio}
    </Typography>
    </Box>
  )
}

export default Bio
