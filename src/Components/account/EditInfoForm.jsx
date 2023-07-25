import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack, TextField }  from '@mui/material'
import { editFormField, submitSuccess, submitFail, flagErrors } from '../../redux/forms/forms.actions';
import MobileValidation from '../validators/MobileValidation';
import PasswordValidtator from '../validators/PasswordValidator';
import { editAccountThunk } from '../../redux/user/user.actions';
import { useThemeContext } from '../../theme/ThemeContextProvider';
import SaveAccountButton from './SaveAccountButton';

const EditInfoForm = () => {

  const dispatch = useDispatch();

  const isEditingAccount = useSelector((state) => !!state.user.isEditingAccount)
  const { firstName, lastName, email, isSuccess, errors, mobile, country } = useSelector((state) => state.forms)
  const userId = useSelector((state) => state.user.defaultUser.id)
  const defaultUser = useSelector((state) => state.user.defaultUser)
  //need a selector to fetch all the data from the user prior to the form uploading
  const { theme } = useThemeContext();

  const inputStyles = { 
    '& label': {
      color: theme.palette.text.secondary,
    },
      '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary, // Change the label color
  },
  '& .MuiInputBase-root': {
    color: theme.palette.text.secondary, // Change the input text color
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: theme.palette.text.secondary, // Change the line (border) color when input is not focused
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: theme.palette.text.primary, // Change the line (border) color when input is hovered
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: `#D97D54`, // Change the line (border) color when input is focused
  },
  }

  const mobileInputStyle = {
    '& label': {
      color: theme.palette.text.secondary
    },
      '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary, // Change the label color
  },
  '& .MuiInputBase-root': {
    color: theme.palette.text.secondary, // Change the input text color
  },
  }

  const handleChange = (fieldName, newValue) => {
    dispatch(editFormField(fieldName,newValue))
  }

  return (
    <Box 
    component='form'
    autoComplete='off'
    display={'flex'}
    justifyContent={'center'} >
    <Stack spacing={4} sx={{width:'400px'}}>
     <TextField
          label='First Name'
          variant={isSuccess ? 'filled' : 'standard'}
          value={firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          helperText={errors.firstName}
          error={!!errors.firstName}
          sx={inputStyles}
        />
      <TextField
        label="Last Name"
        variant={isSuccess ? 'filled' : 'standard'}
        value={lastName}
        onChange={(e) => handleChange('lastName',e.target.value)}
        helperText={errors.lastName}
        error={!!errors.lastName}
        sx={inputStyles}
      />
      <TextField
        label="Email"
        variant={isSuccess ? 'filled' : 'standard'}
        value={email}
        onChange={(e) => handleChange('email',e.target.value)}
        helperText={errors.email}
        error={!!errors.email}
        sx={inputStyles}
      />
       <TextField
            id='component-mobile'
            label='Mobile Number'
            variant={isSuccess ? 'filled' : 'standard'}
            value={mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            helperText={errors.mobile}
            error={!!errors.mobile}
            InputProps={{
              inputComponent: MobileValidation, // Use MobileValidation component as the input
            }}
            sx={mobileInputStyle}
          />
          <Box display={'flex'} justifyContent={'center'} >
            <SaveAccountButton/>
        </Box>
        </Stack>
    </Box>
  )
}

export default EditInfoForm