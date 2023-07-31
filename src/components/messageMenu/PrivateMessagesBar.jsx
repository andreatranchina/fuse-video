import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PrivateMessageIcon from './PrivateMessageIcon'
import MessagesIcon from '../icons/MessagesIcon'

const PrivateMessagesBar = () => {
  return (
    <Container >
      <Box sx={{display: 'flex', justifyContent:'center', marginBottom:'8px'}}>
      <Stack sx={{marginTop:'15px', alignItems:'center'}}> 
      <MessagesIcon/>
        <Typography sx={{fontFamily:`'Roboto Mono', monospace`}}>
          Direct
        </Typography>
        </Stack>
      </Box>
      <Stack spacing={2} sx={{marginTop:'15px', alignItems:'center'}}>
        <PrivateMessageIcon/>
        <PrivateMessageIcon/>
        <PrivateMessageIcon/>
        <PrivateMessageIcon/>
        <PrivateMessageIcon/>
      </Stack>
    </Container>
  )
}

export default PrivateMessagesBar
