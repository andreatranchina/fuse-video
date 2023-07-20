import React from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import { useMediaQuery } from '@mui/material'

const UploadProfilePhoto = () => {

  const { theme } = useThemeContext();
  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const upload = {
    backgroundColor: theme.palette.background.fab.upload, width:'36px', height:'24px', 
    transform: 'translate(45px,34px)'
  }

  const uploadSmall = {
    backgroundColor: theme.palette.background.fab.upload, width:'36px', height:'24px', 
    transform: 'translate(-4px,27px)'
  }


  return (
    <Box>
    {isSmallScreen ? ( <Fab sx={uploadSmall}>
        <IconButton>
          <AddIcon sx={{color:'white'}}/>
        </IconButton>
      </Fab>) : ( <Fab sx={upload}>
        <IconButton>
          <AddIcon sx={{color:'white'}}/>
        </IconButton>
      </Fab>)}
     
    </Box>
  )
}

export default UploadProfilePhoto