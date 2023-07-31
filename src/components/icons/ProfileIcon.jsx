import React from 'react'


const CustomizeIcon = () => {
  return (
    <div style={{transform:'translate(1.5px,4.5px)'}}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 256 256"
            style={{ fill: '#000000' }}
        >
            <g fill="#FF9E00" fillRule="nonzero">
                <g transform="scale(10,10)">
                   <path d="M12,2c-5.523,0 -10,4.477 -10,10c0,5.523 4.477,10 10,10c5.523,0 10,-4.477 10,-10c0,-5.523 -4.477,-10 -10,-10zM12,4.75c1.795,0 3.25,1.455 3.25,3.25c0,1.795 -1.455,3.25 -3.25,3.25c-1.795,0 -3.25,-1.455 -3.25,-3.25c0,-1.795 1.455,-3.25 3.25,-3.25zM12,20c-2.77,0 -5.21,-1.408 -6.646,-3.547c1.121,-1.63 4.692,-2.453 6.646,-2.453c1.954,0 5.525,0.823 6.646,2.453c-1.436,2.139 -3.876,3.547 -6.646,3.547z"></path>
                </g>
            </g>
        </svg>
    </div>
  )
}

export default CustomizeIcon
