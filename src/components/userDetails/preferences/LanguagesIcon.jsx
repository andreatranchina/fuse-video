import React from 'react'
import Box from '@mui/material/Box'
import LanguagesImage from '../../../assets/flags.webp'

const LanguagesIcon = () => {
  return (
    <Box
     component="img"
        sx={{position: 'relative', 
         height:'20%', borderRadius:'5% 5% 5% 5%',boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
        }}
        alt="Cartoon spoken text box with many flags"
        src={LanguagesImage}
        >
    </Box>
  )
}

export default LanguagesIcon
