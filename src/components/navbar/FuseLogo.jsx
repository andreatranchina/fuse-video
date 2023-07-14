import React from 'react';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import FuseIcon from '../icons/FuseIcon'
import '../.././styles/navbar.css';

const FuseLogo = () => {
  const isMobileScreen = useMediaQuery('(max-width: 900px)');

  return (
    <div className="logo">
      <div style={{ transform: isMobileScreen ? `translateY(4px)` : `translateY(5px)`}}>
        <FuseIcon/>
      </div>
      <div className={isMobileScreen ? 'mobile-typography' : 'typography'}>
        <Typography
          variant={isMobileScreen ? 'h5' : 'h4'}
          sx={{ fontFamily: `'Bungee Hairline', cursive`, textShadow: '1px 1px 2px black', fontWeight: '700' }}
        >
          Fuse
        </Typography>
      </div>
    </div>
  );
};

export default FuseLogo;
