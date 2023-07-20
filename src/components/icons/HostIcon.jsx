import React from 'react';
import { useMediaQuery } from '@mui/material';

const HostIcon = ({ width, height }) => {
	const isSmallScreen = useMediaQuery("(max-width: 900px");
  return (
    <div style={{ transform: 'translateY(4px)' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={width}
        height={height}
        viewBox="0 0 512 512"
      >
        <path d="M504.1,256c0,-137 -111.1,-248.1 -248.1,-248.1c-137,0 -248.1,111.1 -248.1,248.1c0,137 111.1,248.1 248.1,248.1c137,0 248.1,-111.1 248.1,-248.1z" fill="#ffffff"></path><path d="M359,256c0,-56.9 -46.1,-103 -103,-103c-56.9,0 -103,46.1 -103,103c0,56.9 46.1,103 103,103c56.9,0 103,-46.1 103,-103z" fill="#d63232"></path>
      </svg>
    </div>
  );
};

export default HostIcon;
