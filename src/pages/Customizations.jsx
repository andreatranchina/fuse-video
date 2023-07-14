import React from 'react'
import Box from '@mui/material/Box'
import FloatingMenu from '../components/navbar/FloatingMenu';
import { useMediaQuery } from '@mui/material'

const Customizations = () => {
    const isSmallScreen = useMediaQuery("(max-width: 900px");

  return (
    <Box sx={{pt:10}}>
        Customizations
        {isSmallScreen ? 
            <div style={{position: 'fixed', left: '50%', bottom: '20px', transform: 'translate(-50%, -50%)',  margin: '0 auto'}}>
                <FloatingMenu />
            </div> : <></>}
    </Box>
  )
}

export default Customizations