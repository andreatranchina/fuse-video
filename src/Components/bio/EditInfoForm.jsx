import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, FormGroup, TextField }  from '@mui/material'
import { editAccount } from '../../redux/user/user.actions'
import { toggleModal } from '../../redux/ui/ui.actions'

const EditInfoForm = () => {

  const dispatch = useDispatch();

  const isEditingAccount = useSelector((state) => !!state.user.isEditingAccount)

  const handleClose = () => {
    dispatch(toggleModal());
    dispatch(editAccount());
  }

  const handleSubmit = () => {

  }
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
        <Button onClick={handleSubmit}>
         "Submit"
        </Button>
        
      </FormGroup>
    </Box>
  )
}

export default EditInfoForm