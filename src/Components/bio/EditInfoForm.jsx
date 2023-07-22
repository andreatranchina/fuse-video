import React from 'react'
import { Box, Button, FormGroup, TextField }  from '@mui/material'

const EditInfoForm = ({handleClose}) => {
  return (
    <Box>
      <FormGroup>
        <TextField
          label="First Name"
        >

        </TextField>
         <TextField
          label="Last Name"
         >
          
        </TextField>
         <TextField
          label="Email"
         >
          
        </TextField>
         <TextField
          label="Phone Number"
         >
          
        </TextField>
        <Button onClick={handleClose}>
         "Close"
        </Button>
      </FormGroup>
    </Box>
  )
}

export default EditInfoForm