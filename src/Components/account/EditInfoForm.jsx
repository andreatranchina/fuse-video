import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Stack, TextField }  from '@mui/material'
import { editFormField, submitSuccess, submitFail, flagErrors } from '../../redux/forms/forms.actions';
import MobileValidation from '../validators/MobileValidation';
import PasswordValidtator from '../validators/PasswordValidator';
import { editAccountThunk } from '../../redux/user/user.actions';
import { parsePhoneNumber, isValidNumber, format } from 'libphonenumber-js';

const EditInfoForm = () => {

  const dispatch = useDispatch();

  const isEditingAccount = useSelector((state) => !!state.user.isEditingAccount)
  const { firstName, lastName, email, isSuccess, errors, mobile, country } = useSelector((state) => state.forms)
  const userId = useSelector((state) => state.user.defaultUser?.id)

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
      console.log('invalid email')
    } 

    const mobileError = errors.mobile;

  if (mobile.trim() === '') {
    // If the mobile number is empty (only whitespace), dispatch an error message for the mobile field
    dispatch(flagErrors({ mobile: 'Please input a mobile number without area code' }));
  } else if (mobileError) {
    // If there was already an error for the mobile field, display that error message
    console.log(mobileError);
  } else {
    try {
      // Parse the phone number
      const mobileNumberInstance = parsePhoneNumber(mobile, country);
      console.log(mobileNumberInstance.number);

      // Check if the phone number is valid, using the isValidNumber method from react-phone-number-input
      const isValidMobile = mobileNumberInstance.number ? isValidNumber(mobileNumberInstance.number) : false;
      console.log(isValidMobile);

      // Format the phone number if it's valid
      if (isValidMobile) {
        dispatch(editFormField('mobile', mobileNumberInstance.number));
      } else {
        // Handle the case when the phone number is not valid
        dispatch(flagErrors({ mobile: 'Invalid mobile number' }));
      }
    } catch (error) {
      // Handle any exceptions that occur during phone number parsing
      console.error('Error parsing phone number:', error);
      dispatch(flagErrors({ mobile: 'Error parsing phone number' }));
    }
  }

    const areErrorsEmpty = Object.values(errors).every((value) => value === '');

    console.log(areErrorsEmpty)

    if (areErrorsEmpty){
      dispatch(submitSuccess());
      const editedAccount = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        country: country
      }
      console.log(editedAccount);
      dispatch(editAccountThunk(7, editedAccount));
      //editUserInfo(firstName, lastName, email, mobile, errors, isSuccess);
    } else {
      console.log('failed');
      dispatch(submitFail());
    }
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
        />
      <TextField
        label="Last Name"
        variant={isSuccess ? 'filled' : 'standard'}
        value={lastName}
        onChange={(e) => handleChange('lastName',e.target.value)}
        helperText={errors.lastName}
        error={!!errors.lastName}
      />
      <TextField
        label="Email"
        variant={isSuccess ? 'filled' : 'standard'}
        value={email}
        onChange={(e) => handleChange('email',e.target.value)}
        helperText={errors.email}
        error={!!errors.email}
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
            sx={{
    "& label": { // Apply styles to the label element within the TextField
      transform: 'translate(10px,5px)',
      fontSize:'13px' // Adjust the value based on your desired downward movement
    },
  }}
          />
        <Button onClick={handleSave}>
         "Save"
        </Button>
        </Stack>
    </Box>
  )
}

export default EditInfoForm