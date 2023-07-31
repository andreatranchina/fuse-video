import React from 'react'
import { useDispatch } from 'react-redux'
import { useThemeContext } from '../../../theme/ThemeContextProvider'
import { inputNewInfo } from '../../../redux/user/user.actions';
import { Box, Button, Typography } from '@mui/material'

const EditAccountButton = () => {

	const dispatch = useDispatch();
	const { theme } = useThemeContext();

	const handleEdit = () => {
		//turning inputting on
		dispatch(inputNewInfo(true));
	}
	

  return (
     <>
			<Button onClick={handleEdit} 
				sx={{ maxWidth: '200px', 
							maxHeight: '30px', 
							minWidth: '200px', 
							minHeight: '30px', 
							color:`${theme.palette.button.main}`, 
							border:`2px solid ${theme.palette.button.main}`, 
							'&:hover': { 
								backgroundColor:`${theme.palette.button.main}`, 
								color:`${theme.palette.background.paper}`, 
								border:`2px solid ${theme.palette.button.main}`} 
				}}>
					<Typography 
						sx={{fontFamily:`'Bungee Hairline', cursive`, 
								fontWeight:700,  
                width: '100%',
								WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:`${theme.palette.button.main}`,
								':hover':{
									WebkitTextStrokeColor:`${theme.palette.background.fab.hover}`}}}>
							Edit
					</Typography>
			</Button>
      
    </>
  )
}

export default EditAccountButton
