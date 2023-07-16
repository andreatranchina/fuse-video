import React from 'react'
import { Box } from "@mui/material"
import '../styles/home.css'
import FloatingMenu from '../components/navbar/FloatingMenu';
import MobileSpeedDial from '../components/navbar/MobileSpeedDial';
import { useThemeContext } from "../theme/ThemeContextProvider"
import { useMediaQuery } from '@mui/material'

const Home = () => {
  const { mode } = useThemeContext();
  const isSmallScreen = useMediaQuery("(max-width: 900px");

  return (
     <Box id={mode === 'light' ? 'home-light' : 'home-dark'} sx={{pt:10, justifyContent:'center', display:'flex'}}>
        Home
        {isSmallScreen ? 
            <div style={{position: 'fixed', left: '50%', bottom: '20px', transform: 'translate(-50%, -20%)',  margin: '0 auto'}}>
                <FloatingMenu />
            </div> : <></>}
            {isSmallScreen ? 
            <div style={{position: 'fixed', left: '90%', bottom: '20px', margin: '0 auto'}}>
                <MobileSpeedDial/>
            </div> : <></>}
    </Box>
  )
}

export default Home