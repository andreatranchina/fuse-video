import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import SideNavLinks from '../components/navbar/SideNavLinks';
import FuseLogo from '../components/navbar/FuseLogo';
import SwitchLayout from '../components/navbar/SwitchLayout';
import { useThemeContext } from "../theme/ThemeContextProvider";
import '../styles/navbar.css';

const RootLayout = () => {
  const isSmallScreen = useMediaQuery("(max-width: 900px");
  const { theme } = useThemeContext();

  const navbarStyle = {
    backgroundColor: theme.palette.primary.main,
  };

  return (
    <div>
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
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
