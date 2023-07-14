import React from 'react'
import { Box } from "@mui/material"
import '../styles/home.css'
import FloatingMenu from '../components/navbar/FloatingMenu';
import { useThemeContext } from "../theme/ThemeContextProvider"
import { useMediaQuery } from '@mui/material'

const Home = () => {
  const { mode } = useThemeContext();
  const isSmallScreen = useMediaQuery("(max-width: 900px");

  return (
     <Box id={mode === 'light' ? 'home-light' : 'home-dark'} sx={{pt:10}} >
        Home
        {isSmallScreen ? 
            <div style={{position: 'fixed', left: '50%', bottom: '20px', transform: 'translate(-50%, -50%)',  margin: '0 auto'}}>
                <FloatingMenu />
            </div> : <></>}
    </Box>
  )
}

export default Home