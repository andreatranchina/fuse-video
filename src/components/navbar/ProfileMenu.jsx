import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useThemeContext } from '../../theme/ThemeContextProvider';
import PersonIcon from '@mui/icons-material/Person'
import { updateEditStatus, setUser } from '../../redux/user/user.actions'
import { setSettingsTab } from '../../redux/ui/ui.actions';
import FirebaseAuthService from '../../firebase/FirebaseAuthService'
import { toggleModal } from '../../redux/ui/ui.actions'

const ProfileMenu = () => {

  const { theme } = useThemeContext();

  const navlink = {
    color: theme.palette.text.primary,
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalOpen = useSelector((state) => !!state.ui.modalIsOpen)
  const loggedInUserId = useSelector((state) => state.user.defaultUser?.id)
  const loggedInUser = useSelector((state) => state.user.defaultUser)

  // const isEditing = useSelector((state) => !state.user.isEditing)

  const handleLogOut = (e) => {
    e.preventDefault();
    // dispatch(logout());
    FirebaseAuthService.logoutUser();
    setAnchorEl(null);
    dispatch(setUser(null));
    navigate("/");
  };

  const handleShowAccount = () => {
    console.log('Modal state', modalOpen);
    dispatch(setSettingsTab(0));
    dispatch(toggleModal());
    dispatch(updateEditStatus());
    setAnchorEl(null);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ "&:hover": { backgroundColor: "transparent", color:theme.palette.background.profile }} }
      >
        
        {/* background: {
            default: dark[500],
            paper: dark[700],
            fab: {
              default: dark[400],
              hover: dark[700],
              upload:dark[800]
            },
            login: dark[900],
            boxShadow: '2px 2px 4px rgba(246, 233, 205, 0.6)',
          }, */}
          {loggedInUser.imgUrl
        ?<img alt="avatar" src={loggedInUser.imgUrl} style={{width:'40px', height: '38px', marginRight: '20px', borderRadius: "2rem"}}  />
        :<PersonIcon sx={{width:'38px', height: '38px', marginRight: '20px'}}/>
          }
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      <NavLink to ={`/profile/${loggedInUserId}`} style={navlink}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
      </NavLink>
        <MenuItem onClick={handleShowAccount}>My account</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </div>
  )}

  export default ProfileMenu
