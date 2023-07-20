import React from 'react'
import Grid from '@mui/material/Grid'
import GroupMessagesBar from '.././components/messageMenu/GroupMessagesBar'
import PrivateMessagesBar from '.././components/messageMenu/PrivateMessagesBar'

const MessageBarLayout = () => {
  return (
    <>
      <Grid item xs={2} sm= {1.5} md={1}sx={{backgroundColor:'yellow', minHeight:'100vh'}}>
        <GroupMessagesBar/>
      </Grid>
      <Grid item xs={2} sm= {1.5} md={1} sx={{backgroundColor:'blue',color:'white'}}>
        <PrivateMessagesBar/>
      </Grid>
    </>
  )
}

export default MessageBarLayout