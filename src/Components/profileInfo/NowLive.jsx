import React from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { useThemeContext } from '../../theme/ThemeContextProvider'

const NowLive = () => {

  const { theme } = useThemeContext();

  const upload = {
    backgroundColor: theme.palette.background.fab.upload, width:'36px', height:'24px', 
    transform:'translate(20px,40px)'
  }

  return (
    <Box sx={{backgroundColor:'pink'}}>
      <Fab sx={upload}>
        <IconButton>
          <AddIcon sx={{color:'white'}}/>
        </IconButton>
      </Fab>
    </Box>
  )
}

export default NowLive