import React from 'react'
import Box from '@mui/material/Box'
import JamSessionImage from '../../assets/side-view-smiley-man-making-music.webp'

const JamLivestream = () => {
  return (
    <Box
     component="img"
        sx={{position: 'absolute', 
         height:'90%', borderRadius:'5% 5% 5% 5%',boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
        }}
        alt="Female skateboarder watching livestream outside"
        src={JamSessionImage}
        >
    </Box>
  )
}

export default JamLivestream