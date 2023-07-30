import React from 'react'
import Box from '@mui/material/Box'
import BusinessMeetingImage from '../../assets/attractive-blond-girl-is-studying-her-modern-room-using-computer.webp'

const CoolStream = () => {
  return (
    <Box
     component="img"
        sx={{position: 'absolute', 
         height:'90%', borderRadius:'5% 5% 5% 5%',boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
        }}
        alt="Attractive blond girl is studying her modern room using computer"
        src={BusinessMeetingImage}
        >
    </Box>
  )
}

export default CoolStream