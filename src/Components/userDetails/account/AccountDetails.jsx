import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditAccountButton from './EditAccountButton'
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'
import { useThemeContext } from '../../../theme/ThemeContextProvider'

const AccountDetails = () => {

	const dispatch = useDispatch();
	const firstName = useSelector((state) => state.user.defaultUser?.firstName);
  const lastName = useSelector((state) => state.user.defaultUser?.lastName);
  const userName = useSelector((state) => state.user.defaultUser?.userName);
	const email = useSelector((state) => state.user.defaultUser?.email)
  const mobile = useSelector((state) => state.user.defaultUser?.mobile);
	const { theme, mode } = useThemeContext();

  return (
     <Box 
      display={'flex'}
      justifyContent={'center'}>
      <Stack spacing={5} sx={{width:'600px', backgroundColor:'', height:'350px'}}>
			<Grid container spacing={1}>
      {/* First row */}
      <Grid item xs={6} >
        <Paper style={{ height: 85, backgroundColor: mode === 'light' ? theme.palette.background.fab.default : theme.palette.background.fab.hover,display:'flex', alignItems:'center' }}>
						<Typography variant='h5' sx={{fontFamily:`'Bungee Hairline', cursive`, WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:`${theme.palette.text.primary}`, fontWeight:700, paddingLeft:'10px', color:theme.palette.text.primary }}>
						{firstName}
						</Typography>
				</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ height: 85, backgroundColor: mode === 'light' ? theme.palette.background.fab.default : theme.palette.background.fab.hover,display:'flex', alignItems:'center' }}>
					<Typography variant='h5' sx={{fontFamily:`'Bungee Hairline', cursive`, WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:`${theme.palette.text.primary}`, fontWeight:700, paddingLeft:'10px', color:theme.palette.text.primary }}>
					{lastName}
				</Typography>
				</Paper>
      </Grid>

      {/* Second row */}
      <Grid item xs={6}>
        <Paper style={{ height: 85, backgroundColor: mode === 'light' ? theme.palette.background.fab.default : theme.palette.background.fab.hover,display:'flex', alignItems:'center'  }}>
					 <Typography sx={{fontFamily:`'Roboto mono', monospace`, paddingLeft:'10px', color:theme.palette.text.primary }}>
					{email}
				</Typography>
				</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ height: 85, backgroundColor: mode === 'light' ? theme.palette.background.fab.default : theme.palette.background.fab.hover,display:'flex', alignItems:'center' }}>
					 <Typography sx={{fontFamily:`'Roboto mono', monospace`, paddingLeft:'10px', color:theme.palette.text.primary }}>
					Username: @{userName}
				</Typography>
				</Paper>
      </Grid>
			<Grid item xs={12}>
       <Paper sx={{ height: 50, backgroundColor: mode === 'light' ? theme.palette.background.fab.default : theme.palette.background.fab.hover,paddingBottom:'10px', paddingRight:'10px',paddingLeft:'10px', display:'flex',alignItems:'center' }}>
       <Typography sx={{fontFamily:`'Roboto mono', monospace`, color:theme.palette.text.primary}}>
					Mobile: {mobile}
				</Typography>
				</Paper>
      </Grid>
    </Grid>
      <Box display={'flex'} justifyContent={'center'} sx={{transform:'translateY(-20px)'}}  >
      {/* SAVE ACCOUNT INFORMATION */}
        <EditAccountButton />
      </Box>
    </Stack>
  </Box>
  )
}

export default AccountDetails