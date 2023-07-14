import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
// import DiplomaBorder from '.././diploma-border.png';

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        root: {
          marginTop: '-5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        paper: {
        //   backgroundImage: `url(${DiplomaBorder})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '110px',
          height: '150px',
          alignItems: 'center'
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          marginTop: '5px',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '14px',
          fontFamily: `'Manrope', sans-serif`,
          fontWeight: '700',
          textShadow: '1px 1px 1px white',
        },
      },
    },
  },
});

const SideMenuToggle = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMobileScreen = useMediaQuery('(max-width: 414px)');
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          id="dropdown-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ marginRight: '15px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                fontFamily: `'Roboto Mono', monospace`,
                textShadow: '1px 1px 2px black',
                '&:hover': { color: 'var(--bone)' },
              }}
            >
              Menu
            </Typography>
            <MenuIcon />
          </div>
        </Button>
        <Menu
          id="mobile-navlinks"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{ alignItems: isMobileScreen ? 'center' : 'stretch' }} // Use "center" for small screens and "stretch" for larger screens
        >
          <MenuItem onClick={handleClose} sx={{marginTop: "10px"}}>
            <NavLink to="/join">
            <Typography>
            Join
            </Typography>
            </NavLink>
          </MenuItem>

         <Divider
            sx={{
              color: '1px solid rgb(150, 124, 105, 0.4)',
              paddingBottom: '5px',
              transform: isSmallScreen ? 'translateY(-5px)' : 'none',
            }}
          />

            <MenuItem onClick={handleClose}>
            <NavLink to="/host"> 
            <Typography sx={{marginBottom: isSmallScreen ? '30px' : undefined }}>
            Host
            </Typography>
            </NavLink>
          </MenuItem>
           <Divider
            sx={{
              color: '1px solid rgb(150, 124, 105, 0.4)',
              paddingBottom: '5px',
              transform: isSmallScreen ? 'translateY(-5px)' : 'none',
            }}
          />
        </Menu>
      </div>
    </ThemeProvider>
  );
};

export default SideMenuToggle;
