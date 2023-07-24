import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Stack }  from '@mui/material'
import { editFormField, submitSuccess, submitFail, flagErrors } from '../../redux/forms/forms.actions';
import MobileValidation from '../validators/MobileValidation';
import PasswordValidtator from '../validators/PasswordValidator';

const EditInfoForm = () => {

  const dispatch = useDispatch();

  const isEditingAccount = useSelector((state) => !!state.user.isEditingAccount)
  const { firstName, lastName, email, isSuccess, errors } = useSelector((state) => state.forms)
  

  //need a selector to fetch all the data from the user prior to the form uploading

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleChange = (fieldName, newValue) => {
    dispatch(editFormField(fieldName,newValue))
  }

  const handleSave = (e) => {
    if (firstName.trim() === '' && firstName.includes(' ')){
      //get the user's first name from auth
    }

    if (lastName.trim() === '' && lastName.includes(' ')){
      //get the user's last name from auth
    }
    
    if (!isValidEmail(email)){
      dispatch(flagErrors({ email: 'Invalid Email'})) 
    } 

    const hasErrors = Object.keys(errors).length > 0;

    if (!hasErrors){
      submitSuccess();
      //editUserInfo(firstName, lastName, email, mobile, errors, isSuccess);
    } else {
      submitFail();
    }
  }

  return (
    <Box 
    component='form'
    autoComplete='off'>
    <Stack>
      <FormControl
        variant='outlined'>
        <InputLabel htmlFor='component-first'>First Name
        </InputLabel>
        <Input
          id='component-first'
          placeholder={firstName}
          onChange={(e) => handleChange('firstName',e.target.value)}
        />
        {errors.firstName && <FormHelperText>{errors.firstName}</FormHelperText>}
      </FormControl>
      <FormControl
        variant='outlined'>
        <InputLabel htmlFor='component-first'>Last Name
        </InputLabel>
        <Input
          id='component-last'
          placeholder={lastName}
          onChange={(e) => handleChange('lastName',e.target.value)}
        />
        {errors.lastName && <FormHelperText>{errors.lastName}</FormHelperText>}
      </FormControl>
      <FormControl
        variant={isSuccess ? 'filled' : 'outlined'}
        error={!!errors.name}
      >
        <InputLabel htmlFor='component-email'>Email
        </InputLabel>
        <Input
          id='component-email'
          placeholder={email}
          onChange={(e) => handleChange('email',e.target.value)}
        />
        {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
      </FormControl>
      {/* <FormControl>
        <InputLabel htmlFor="password-input">Password</InputLabel>
        <PasswordValidtator/>
        {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
      </FormControl> */}
      <FormControl
        variant={isSuccess ? 'filled' : 'outlined'}
        error={!!errors.mobile}
      >
        <InputLabel htmlFor='component-mobile'>Mobile Number
        </InputLabel>
        <MobileValidation/>
        {errors.mobile && <FormHelperText>{errors.mobile}</FormHelperText>}
      </FormControl>
        <Button onClick={handleSave}>
         "Save"
        </Button>
        </Stack>
    </Box>
  )
}

export default EditInfoForm