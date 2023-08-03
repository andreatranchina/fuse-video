import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import GroupMessageIcon from './GroupMessageIcon'
import GroupsIcon from '../icons/GroupsIcon'

const userProfiles = [ 
  '.././assets/oppenheimer.webp',
  '.././assets/happy-girl.webp',
  '.././assets/confident-white-woman-with-black-hair-making-selfie-with-interested-face-expression.webp',
  'beautiful-woman-clean-urban-environment.webp',
  'ken.webp'
]

const GroupMessagesBar = () => {
  return (
    <Container >
      <Box sx={{display:'flex', justifyContent:'center', marginBottom:'8px'}}>
        <Stack sx={{marginTop:'15px', alignItems:'center'}}>
          <GroupsIcon />
        <Typography sx={{fontFamily:`'Roboto Mono', monospace`}}>
          Groups
        </Typography>
        </Stack>
      </Box>
      <Stack spacing={2} sx={{marginTop:'15px', marginLeft:'3px', alignItems:'center'}}>

      {userProfiles?.map((userProfile) => 
        <GroupMessageIcon key={userProfile.id}/>)}
      </Stack>
    </Container>
    
  )
}

export default GroupMessagesBar
