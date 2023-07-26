import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editProfile } from '../../redux/user/user.actions'
import { Box, Button, Modal, Typography, createMuiTheme } from '@mui/material'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import Backdrop from '@mui/material/Backdrop'
import EditIcon from '@mui/icons-material/Edit'
import EditInfoForm from '../account/EditInfoForm'
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const CustomBackdrop = styled('div')(({ theme }) => ({
  zIndex: theme.zIndex.modal -1 ,
}));

const EditProfile= () => {

	const { theme } = useThemeContext();
  const modalTheme = useTheme();
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => !!state.user.isEditingAccount)

  const editButton = {
    backgroundColor:theme.palette.button.main,
    '&:hover': {
      backgroundColor: theme.palette.background.fab.hover, color:'black' 
      }
  }

  console.log(isEditing);

	const editText = { 
		fontFamily:`'Bungee Hairline', cursive`, 
		fontWeight:'700',
        marginRight:'8px',
        color: theme.palette.text
	}

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditProfile = () => {
    dispatch(editProfile());
    setOpen(true);
  }
	
  return (
    <Box sx={{marginRight:'10px'}}>
    	<Button sx={editButton} onClick = {handleEditProfile}>
			<Typography variant='subtitle2' sx={editText}>
				Edit Info
				</Typography>
                <EditIcon />
			</Button>
    </Box>
  )
}

export default EditProfile