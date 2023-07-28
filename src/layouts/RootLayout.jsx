import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Box, useMediaQuery, Modal, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import UserLogin from '../components/login/UserLogin.jsx'
import SideNavLinks from '../components/navbar/SideNavLinks';
import FuseLogo from '../components/navbar/FuseLogo';
import SwitchLayout from '../components/navbar/SwitchLayout';
import { useThemeContext } from "../theme/ThemeContextProvider";
import '../styles/navbar.css';
import MobileSpeedDial from '../components/navbar/MobileSpeedDial.jsx';
import ProfileMenu from '../components/navbar/ProfileMenu.jsx';
import { styled } from '@mui/material/styles';
import { toggleModal } from '../redux/ui/ui.actions.js'
import SettingsTabs from '../components/userDetails/SettingsTabs.jsx';
import SettingsStepper from '../components/userDetails/SettingsStepper.jsx';
import Draggable from 'react-draggable'

const HiddenBackdrop = styled('div')(({ theme }) => ({
  zIndex: theme.zIndex.modal - 1,
}));

const RootBackdrop = styled('div')(({ theme }) => ({
  zIndex: theme.zIndex.modal - 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}));

const RootLayout = () => {
  const isLoggedIn = useSelector((state) => !!state.user.defaultUser?.id);
  const isEditingAccount = useSelector((state) => !!state.user.isEditingAccount)
  const isSmallScreen = useMediaQuery("(max-width: 900px");
  const isSmallerScreen = useMediaQuery('(max-width: 550px)');
  const isXtraSmallScreen = useMediaQuery('(max-width: 420px)');
  const isMobileScreen = useMediaQuery('(max-width: 390px)');
  const dispatch = useDispatch();
  const { theme } = useThemeContext();
  const open = useSelector(state => !!state.ui.modalIsOpen);
  const modalIsOpen = useSelector(state => state.ui.modalIsOpen)
  
  const navbarStyle = {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.palette.background.boxShadow
  };

  const loginStyle = { 
    display:'flex',
    justifyContent: isSmallScreen ? 'space-between' : 'flex-end',
    backgroundColor: theme.palette.background.login,
    paddingTop: '80px',
  }

   const modal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isSmallerScreen ? '90%' : '700px',
    height: isSmallerScreen ? '90%' : '70%',
    display: 'flex',
    justifyContent:'center',
    border: `2px solid ${theme.palette.text.secondary}`,
    backgroundColor:theme.palette.background.default,
    boxShadow: 24,
    p: 4,
    borderRadius:'2%'
};

  const handleClose = () => {
    dispatch(toggleModal())
  };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Fuse</title>
        <link rel="icon" href="https://img.icons8.com/badges/48/000000/fuse-symbol.png" />
        <meta name="description" content="Fuse video" />
      </Helmet>
      <header>
        <nav id="navbar" style={navbarStyle}>
            <div className="home-navlink">
              <NavLink to="/">
                <FuseLogo />
              </NavLink>
            </div>
            <div>
              {isSmallScreen ? 
              <Stack direction='row'>
              {isLoggedIn ? (
                <ProfileMenu/>) : ('')}
                <SwitchLayout/>
              </Stack> : <SideNavLinks/>}
            </div>
        </nav>
        {/* SHOW THE USER LOGIN/SIGNUP DROPDOWN IN NAVBAR IF LOGGED IN */}
        {!isLoggedIn ? (<nav id="login" style={loginStyle}>
          <UserLogin/>
        </nav>) : ('')}
      </header>
      {/* APPLY BACKDROP WHEN MODAL IS OPEN */}
       {modalIsOpen && <RootBackdrop />}
      <main>
        <Outlet />
        {/* SHOW MODAL IF ACCOUNT SETTINGS SELECTED FROM PROFILE ICON DROPDOWN */}
        {isEditingAccount ? ( 
          <Modal
            sx={modal}
            open={open}
            BackdropComponent={HiddenBackdrop} 
        >
        {isSmallerScreen ? (<Box sx={{paddingLeft: isMobileScreen ? ('') : isXtraSmallScreen ? ('20px') : ('')}}><SettingsStepper/></Box>) : (<SettingsTabs/>)}
      </Modal>
    ) : ('')}
      </main>
      <footer>
        {isSmallScreen ? 
            <div style={{position: 'fixed', left: '90%', bottom: '20px', margin: '0 auto'}}>
                <MobileSpeedDial/>
            </div> : <></>}
      </footer>
    </>
  );
};

export default RootLayout;
