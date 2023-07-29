import React from 'react'
import Box from '@mui/material/Box'
import FloatingMenu from '../components/navbar/FloatingMenu';
import { useMediaQuery } from '@mui/material'

const Customizations = () => {
    const isSmallScreen = useMediaQuery("(max-width: 900px");

  return (
    <Box sx={{pt:10}}>
        Customizations
    </Box>
  )
}

export default Customizations