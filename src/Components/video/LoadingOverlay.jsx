import React from 'react'
import { CircularProgress } from '@mui/material'

const LoadingOverlay = () => {
  return (
    <div className='loading-overlay-container'>
        <CircularProgress size="8rem" sx={{position:"relative", top:"13rem", color:"white"}}/>
    </div>
  )
}

export default LoadingOverlay