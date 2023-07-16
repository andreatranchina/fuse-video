import React from 'react'
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { useMediaQuery } from '@mui/material';
const FuseIcon = () => {

    const { mode } = useThemeContext();
    const isSmallScreen = useMediaQuery("(max-width: 900px");


  return (
    <>
    {mode === 'dark' ? (<svg
          xmlns="http://www.w3.org/2000/svg"
          width={isSmallScreen ? '28px' : '38px'}
          height={isSmallScreen ? '28px' : '38px'}
          viewBox="0 0 256 256"
          style={{ fill: '#000000' }}
        >
          <g fill="none" fillRule="nonzero">
            <g transform="scale(5.33333,5.33333)">
              <path
                d="M41.737,28c-0.892,-3.445 -4.017,-6 -7.737,-6h-20c-1.103,0 -2,-0.897 -2,-2c0,-1.103 0.897,-2 2,-2h9c3.859,0 7,-3.141 7,-7v-2h-0.297c-0.563,-1.874 -1.899,-3.459 -3.703,-4.317v-1.683c0,-0.553 -0.447,-1 -1,-1h-4c-0.553,0 -1,0.447 -1,1v1.683c-2.419,1.151 -4,3.607 -4,6.317c0,0.334 0.024,0.668 0.074,1h-2.074c-3.719,0 -6.845,2.555 -7.737,6h-0.263v2c0,4.411 3.589,8 8,8h20c1.103,0 2,0.897 2,2c0,1.103 -0.897,2 -2,2h-11c-3.164,0 -5.842,2.112 -6.705,5h-0.295v2c0,2.71 1.581,5.166 4,6.317v1.683c0,0.553 0.447,1 1,1h4c0.553,0 1,-0.447 1,-1v-1.683c2.419,-1.151 4,-3.607 4,-6.317c0,-0.334 -0.024,-0.668 -0.074,-1h4.074c4.411,0 8,-3.589 8,-8v-2z"
                fill="#5c7cfa"
              />
              <path
                d="M34,21h-20c-1.654,0 -3,-1.346 -3,-3c0,-1.654 1.346,-3 3,-3h9c3.309,0 6,-2.691 6,-6c0,-2.607 -1.673,-4.824 -4,-5.65v-2.35h-4v2.35c-2.327,0.826 -4,3.043 -4,5.65c0,0.702 0.128,1.373 0.35,2h-3.35c-3.859,0 -7,3.141 -7,7c0,3.859 3.141,7 7,7h20c1.654,0 3,1.346 3,3c0,1.654 -1.346,3 -3,3h-11c-3.309,0 -6,2.691 -6,6c0,2.607 1.673,4.824 4,5.65v2.35h4v-2.35c2.327,-0.826 4,-3.043 4,-5.65c0,-0.702 -0.128,-1.373 -0.35,-2h5.35c3.859,0 7,-3.141 7,-7c0,-3.859 -3.141,-7 -7,-7z"
                fill="#ffffff"
              />
              <path
                d="M25,46h-4c-0.553,0 -1,-0.447 -1,-1v-1.683c-2.419,-1.151 -4,-3.607 -4,-6.317c0,-3.859 3.141,-7 7,-7h11c1.103,0 2,-0.897 2,-2c0,-1.103 -0.897,-2 -2,-2h-20c-4.411,0 -8,-3.589 -8,-8c0,-4.411 3.589,-8 8,-8h2.074c-0.05,-0.332 -0.074,-0.666 -0.074,-1c0,-2.71 1.581,-5.166 4,-6.317v-1.683c0,-0.553 0.447,-1 1,-1h4c0.553,0 1,0.447 1,1v1.683c2.419,1.151 4,3.607 4,6.317c0,3.859 -3.141,7 -7,7h-9c-1.103,0 -2,0.897 -2,2c0,1.103 0.897,2 2,2h20c4.411,0 8,3.589 8,8c0,4.411 -3.589,8 -8,8h-4.074c0.05,0.332 0.074,0.666 0.074,1c0,2.71 -1.581,5.166 -4,6.317v1.683c0,0.553 -0.447,1 -1,1zM22,44h2v-1.35c0,-0.423 0.267,-0.801 0.665,-0.942c1.995,-0.709 3.335,-2.602 3.335,-4.708c0,-0.558 -0.099,-1.118 -0.292,-1.667c-0.108,-0.306 -0.062,-0.646 0.126,-0.91c0.187,-0.266 0.492,-0.423 0.816,-0.423h5.35c3.309,0 6,-2.691 6,-6c0,-3.309 -2.691,-6 -6,-6h-20c-2.206,0 -4,-1.794 -4,-4c0,-2.206 1.794,-4 4,-4h9c2.757,0 5,-2.243 5,-5c0,-2.106 -1.34,-3.999 -3.335,-4.708c-0.398,-0.142 -0.665,-0.52 -0.665,-0.942v-1.35h-2v1.35c0,0.423 -0.267,0.801 -0.665,0.942c-1.995,0.709 -3.335,2.602 -3.335,4.708c0,0.558 0.099,1.118 0.292,1.667c0.108,0.306 0.062,0.646 -0.126,0.91c-0.187,0.266 -0.492,0.423 -0.816,0.423h-3.35c-3.309,0 -6,2.691 -6,6c0,3.309 2.691,6 6,6h20c2.206,0 4,1.794 4,4c0,2.206 -1.794,4 -4,4h-11c-2.757,0 -5,2.243 -5,5c0,2.106 1.34,3.999 3.335,4.708c0.398,0.142 0.665,0.52 0.665,0.942z"
                fill="#5c7cfa"
              />
              <circle cx="23" cy="9" r="2" fill="#5c7cfa" />
              <circle cx="23" cy="37" r="2" fill="#5c7cfa" />
            </g>
          </g>
        </svg>) : ( <svg xmlns="http://www.w3.org/2000/svg" width={isSmallScreen ? '28px' : '38px'}
          height={isSmallScreen ? '28px' : '38px'} viewBox="0 0 256 256" style={{ fill: '#000000' }}>
  <g fill="none" fillRule="nonzero">
    <g transform="scale(5.33333,5.33333)">
      <path d="M41.737,28c-0.892,-3.445 -4.017,-6 -7.737,-6h-20c-1.103,0 -2,-0.897 -2,-2c0,-1.103 0.897,-2 2,-2h9c3.859,0 7,-3.141 7,-7v-2h-0.297c-0.563,-1.874 -1.899,-3.459 -3.703,-4.317v-1.683c0,-0.553 -0.447,-1 -1,-1h-4c-0.553,0 -1,0.447 -1,1v1.683c-2.419,1.151 -4,3.607 -4,6.317c0,0.334 0.024,0.668 0.074,1h-2.074c-3.719,0 -6.845,2.555 -7.737,6h-0.263v2c0,4.411 3.589,8 8,8h20c1.103,0 2,0.897 2,2c0,1.103 -0.897,2 -2,2h-11c-3.164,0 -5.842,2.112 -6.705,5h-0.295v2c0,2.71 1.581,5.166 4,6.317v1.683c0,0.553 0.447,1 1,1h4c0.553,0 1,-0.447 1,-1v-1.683c2.419,-1.151 4,-3.607 4,-6.317c0,-0.334 -0.024,-0.668 -0.074,-1h4.074c4.411,0 8,-3.589 8,-8v-2z" fill="#530088"></path>
      <path d="M34,21h-20c-1.654,0 -3,-1.346 -3,-3c0,-1.654 1.346,-3 3,-3h9c3.309,0 6,-2.691 6,-6c0,-2.607 -1.673,-4.824 -4,-5.65v-2.35h-4v2.35c-2.327,0.826 -4,3.043 -4,5.65c0,0.702 0.128,1.373 0.35,2h-3.35c-3.859,0 -7,3.141 -7,7c0,3.859 3.141,7 7,7h20c1.654,0 3,1.346 3,3c0,1.654 -1.346,3 -3,3h-11c-3.309,0 -6,2.691 -6,6c0,2.607 1.673,4.824 4,5.65v2.35h4v-2.35c2.327,-0.826 4,-3.043 4,-5.65c0,-0.702 -0.128,-1.373 -0.35,-2h5.35c3.859,0 7,-3.141 7,-7c0,-3.859 -3.141,-7 -7,-7z" fill="#ffffff"></path>
      <path d="M25,46h-4c-0.553,0 -1,-0.447 -1,-1v-1.683c-2.419,-1.151 -4,-3.607 -4,-6.317c0,-3.859 3.141,-7 7,-7h11c1.103,0 2,-0.897 2,-2c0,-1.103 -0.897,-2 -2,-2h-20c-4.411,0 -8,-3.589 -8,-8c0,-4.411 3.589,-8 8,-8h2.074c-0.05,-0.332 -0.074,-0.666 -0.074,-1c0,-2.71 1.581,-5.166 4,-6.317v-1.683c0,-0.553 0.447,-1 1,-1h4c0.553,0 1,0.447 1,1v1.683c2.419,1.151 4,3.607 4,6.317c0,3.859 -3.141,7 -7,7h-9c-1.103,0 -2,0.897 -2,2c0,1.103 0.897,2 2,2h20c4.411,0 8,3.589 8,8c0,4.411 -3.589,8 -8,8h-4.074c0.05,0.332 0.074,0.666 0.074,1c0,2.71 -1.581,5.166 -4,6.317v1.683c0,0.553 -0.447,1 -1,1zM22,44h2v-1.35c0,-0.423 0.267,-0.801 0.665,-0.942c1.995,-0.709 3.335,-2.602 3.335,-4.708c0,-0.558 -0.099,-1.118 -0.292,-1.667c-0.108,-0.306 -0.062,-0.646 0.126,-0.91c0.187,-0.266 0.492,-0.423 0.816,-0.423h5.35c3.309,0 6,-2.691 6,-6c0,-3.309 -2.691,-6 -6,-6h-20c-2.206,0 -4,-1.794 -4,-4c0,-2.206 1.794,-4 4,-4h9c2.757,0 5,-2.243 5,-5c0,-2.106 -1.34,-3.999 -3.335,-4.708c-0.398,-0.142 -0.665,-0.52 -0.665,-0.942v-1.35h-2v1.35c0,0.423 -0.267,0.801 -0.665,0.942c-1.995,0.709 -3.335,2.602 -3.335,4.708c0,0.558 0.099,1.118 0.292,1.667c0.108,0.306 0.062,0.646 -0.126,0.91c-0.187,0.266 -0.492,0.423 -0.816,0.423h-3.35c-3.309,0 -6,2.691 -6,6c0,3.309 2.691,6 6,6h20c2.206,0 4,1.794 4,4c0,2.206 -1.794,4 -4,4h-11c-2.757,0 -5,2.243 -5,5c0,2.106 1.34,3.999 3.335,4.708c0.398,0.142 0.665,0.52 0.665,0.942z" fill="#530088"></path>
      <circle cx="23" cy="9" r="2" fill="#530088"></circle>
      <circle cx="23" cy="37" r="2" fill="#530088"></circle>
    </g>
  </g>
</svg>)}

        </>
  )
}

export default FuseIcon