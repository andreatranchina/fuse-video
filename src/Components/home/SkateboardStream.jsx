import React from 'react'
import { Box, useMediaQuery} from '@mui/material'
import SkateboardImage from '../../assets/beautiful-woman-clean-urban-environment.webp'

const SkateboardStream = () => {

  const isMobileScreen = useMediaQuery('(max-width: 420px)')

  return (
    <Box
     component="img"
        sx={{
         height:isMobileScreen ? '90%' : '65%', borderRadius:'5% 5% 5% 5%',
         boxShadow: '2px solid black'
        }}
        alt="Female skateboarder watching livestream outside"
        src={SkateboardImage}
        >
    </Box>
  )
}

export default SkateboardStream