import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import GroupMessageIcon from './GroupMessageIcon'
import GroupsIcon from '../icons/GroupsIcon'

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
        <GroupMessageIcon/>
        <GroupMessageIcon/>
        <GroupMessageIcon/>
        <GroupMessageIcon/>
        <GroupMessageIcon/>
      </Stack>
    </Container>
    
  )
}

export default GroupMessagesBar
