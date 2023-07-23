import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useMediaQuery, Modal, Stack } from '@mui/material';
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
import EditInfoForm from '../components/bio/EditInfoForm.jsx';
import { editAccount } from '../redux/user/user.actions.js';
import { toggleModal } from '../redux/ui/ui.actions.js'

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
  const isLoggedIn = useSelector((state) => !!state.user.id);
  const isEditingAccount = useSelector((state) => !!state.user.isEditingAccount)
  const isSmallScreen = useMediaQuery("(max-width: 900px");
  const dispatch = useDispatch();
  const { theme } = useThemeContext();
  const open = useSelector(state => !state.modalIsOpen);
  const modalIsOpen = useSelector(state => state.ui.modalIsOpen)
  
  const navbarStyle = {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.palette.background.boxShadow
  };
  useEffect(() => {
    console.log('isEditingAccount changed:', isEditingAccount);
  }, [isEditingAccount]);

  const loginStyle = { 
    display:'flex',
    justifyContent: isSmallScreen ? 'space-between' : 'flex-end',
    backgroundColor: theme.palette.background.login,
    paddingTop: '80px', color:'black'
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
        {!isLoggedIn ? (<nav id="login" style={loginStyle}>
          <UserLogin/>
        </nav>) : ('')}
      </header>
       {modalIsOpen && <RootBackdrop />}
      <main>
        <Outlet />
        {/* SHOW MODAL IF ACCOUNT SETTINGS SELECTED FROM PROFILE ICON DROPDOWN */}
        {isEditingAccount ? ( <Modal
        sx={modal}
        open={open}
        BackdropComponent={HiddenBackdrop} 
        >
        <>
      <EditInfoForm handleClose={handleClose}/></>
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
