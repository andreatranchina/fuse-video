import React from 'react'
import Grid from '@mui/material/Grid'
import GroupMessagesBar from '.././components/messageMenu/GroupMessagesBar'
import PrivateMessagesBar from '.././components/messageMenu/PrivateMessagesBar'
import { useThemeContext } from ".././theme/ThemeContextProvider"

const MessageBarLayout = () => {

  const { theme } = useThemeContext();

  return (
    <>
      <Grid item xs={2} sm= {1.5} md={1}sx={{ minHeight:'100vh', borderRight: `2px solid ${theme.palette.button.main}`}}>
        <GroupMessagesBar/>
      </Grid>
      <Grid item xs={2} sm= {1.5} md={1} sx={{borderRight: `2px solid ${theme.palette.button.main}`}}>
        <PrivateMessagesBar/>
      </Grid>
    </>
  )
}

export default MessageBarLayout