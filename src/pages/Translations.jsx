import React from 'react'
import Box from '@mui/material/Box'
import FloatingMenu from '../components/navbar/FloatingMenu';
import { useMediaQuery } from '@mui/material'

const Translations = () => {
     const isSmallScreen = useMediaQuery("(max-width: 900px");

  return (
    <Box sx={{pt:10}}>
        Translations
        {isSmallScreen ? 
            <div style={{position: 'fixed', left: '50%', bottom: '20px', transform: 'translate(-50%, -50%)',  margin: '0 auto'}}>
                <FloatingMenu />
            </div> : <></>}
    </Box>
  )
}

export default Translations