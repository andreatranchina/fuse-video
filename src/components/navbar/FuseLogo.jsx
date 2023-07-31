import React from 'react'
import Typography from '@mui/material/Typography'
import { useMediaQuery } from '@mui/material'
import FuseIcon from '../icons/FuseIcon'
import '../.././styles/navbar.css'
import { useThemeContext } from "../../theme/ThemeContextProvider"

const FuseLogo = () => {
  const isMobileScreen = useMediaQuery('(max-width: 900px)');
  const { theme } = useThemeContext();

  return (
    <div className="logo">
    {isMobileScreen ? (<></>) : (
      
      <div style={{ transform: isMobileScreen ? `translateY(4px)` : `translateY(5px)`}}>
        <FuseIcon/>
      </div>)}
      
      <div className={isMobileScreen ? 'mobile-typography' : 'typography'}>
        <Typography
          variant={isMobileScreen ? 'h5' : 'h4'}
          sx={{ fontFamily: `'Bungee Hairline', cursive`, textShadow: '1px 1px 2px black', fontWeight: '700', color: theme.palette.text.primary, WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:theme.palette.text.primary, transform:'translate(-10px,3px)' }}
        >
          Fuse
        </Typography>
      </div>
    </div>
  );
};

export default FuseLogo;
