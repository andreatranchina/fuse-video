import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { editProfile } from '../../redux/user/user.actions'
import { Box, Button, Modal, Typography, createMuiTheme } from '@mui/material'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import Backdrop from '@mui/material/Backdrop'
import EditIcon from '@mui/icons-material/Edit'
import EditInfoForm from '../bio/EditInfoForm'
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const CustomBackdrop = styled('div')(({ theme }) => ({
  zIndex: theme.zIndex.modal -1 ,
}));

const EditProfile= () => {

	const { theme } = useThemeContext();
  const modalTheme = useTheme();
  const isEditing = useSelector((state) => !state.user.isEditing)

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

  const modal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditProfile = () => {
    editProfile();
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
      {isEditing ? ( <Modal
        keepMounted
        sx={modal}
        open={open}
        BackdropComponent={CustomBackdrop} 
        >
      <EditInfoForm handleClose={handleClose}/>
    </Modal>) : ('')}
    </Box>
  )
}

export default EditProfile