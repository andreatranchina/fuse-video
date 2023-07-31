import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateEditStatus } from '../../redux/user/user.actions'
import { setSettingsTab } from '../../redux/ui/ui.actions'
import { toggleModal } from '../../redux/ui/ui.actions'
import { Box, Button, Typography } from '@mui/material'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import EditIcon from '@mui/icons-material/Edit'
// import { styled } from '@mui/material/styles';

// const CustomBackdrop = styled('div')(({ theme }) => ({
//   zIndex: theme.zIndex.modal -1 ,
// }));

const EditProfile= () => {

	const { theme, mode } = useThemeContext();
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => !!state.user.isEditingAccount)
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)

  const editButton = {
    backgroundColor:theme.palette.button.main,
    '&:hover': {
      backgroundColor: mode ==='light' ? theme.palette.background.login : theme.palette.background.login
    }
  }

  console.log(isEditing);

	const editText = {
  fontFamily: `'Bungee Hairline', cursive`,
  fontWeight: '700',
  marginRight: '8px',
  WebkitTextStrokeWidth: '2px', 
	WebkitTextStrokeColor:theme.palette.text,
  '&:hover': {
    color: mode === 'light' ? 'white' : theme.palette.background.fab.login, // Text color on hover
  },
};

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditProfile = () => {
    dispatch(toggleModal());
    dispatch(updateEditStatus());
    dispatch(setSettingsTab(1));
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