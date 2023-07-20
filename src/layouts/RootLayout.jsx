import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { Helmet } from 'react-helmet-async'
import UserLogin from '../components/login/UserLogin.jsx'
import SideNavLinks from '../components/navbar/SideNavLinks';
import FuseLogo from '../components/navbar/FuseLogo';
import SwitchLayout from '../components/navbar/SwitchLayout';
import { useThemeContext } from "../theme/ThemeContextProvider";
import '../styles/navbar.css';
import MobileSpeedDial from '../components/navbar/MobileSpeedDial.jsx';

const RootLayout = () => {
  const isSmallScreen = useMediaQuery("(max-width: 900px");
  const { theme } = useThemeContext();

  const navbarStyle = {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.palette.background.boxShadow
  };

  const loginStyle = { 
    display:'flex',
    justifyContent: isSmallScreen ? 'space-between' : 'flex-end',
    backgroundColor: theme.palette.background.login,
    paddingTop: '80px', color:'black'
  }

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
              {isSmallScreen ? <SwitchLayout/> : <SideNavLinks/>}
            </div>
        </nav>
        <nav id="login" style={loginStyle}>
          <UserLogin/>
        </nav>
      </header>
      <main>
        <Outlet />
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
