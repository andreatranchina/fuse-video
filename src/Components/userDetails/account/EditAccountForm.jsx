import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack, TextField }  from '@mui/material'
import { editAccountField } from '../../../redux/account/account.actions';
import MobileValidation from '../../validators/MobileValidation';
import PasswordValidtator from '../../validators/PasswordValidator';
import { useThemeContext } from '../../../theme/ThemeContextProvider';
import SaveAccountButton from './SaveAccountButton';

const EditAccountForm = () => {

  const dispatch = useDispatch();

  const { firstName, lastName, email, isSuccess, errors, mobile, userName, } = useSelector((state) => state.account)
  const { theme } = useThemeContext();

  const inputStyles = { 
    width:'100%',
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

  const mobileInputStyle = { transform: errors ? 'translate(4px, -15px' : 'translateY(-15px)',
    '& label': {
      color: theme.palette.text.secondary,
      transform: errors ? 'translateY(10px)' : 'translateY(15px)',
      fontSize:'12px'
    },
    '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary, // Change the label color
    },
    '& .MuiInputBase-root': {
      color: theme.palette.text.secondary, // Change the input text color
    },
  }

  const handleChange = (fieldName, newValue) => {
    dispatch(editAccountField(fieldName,newValue))
  }
  
  return (
    <Box 
      component='form'
      autoComplete='off'
      display={'flex'}
      justifyContent={'center'}>
      <Stack spacing={4} sx={{width:'600px'}}>
        <Stack direction='row' spacing={2} display={'flex'} justifyContent={'space-between'} sx={{w:'100%'}}>
        <TextField
          label='First Name'
          variant={!errors.firstName && isSuccess ? 'filled' : 'standard'}
          value={firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          helperText={errors.firstName}
          error={!!errors.firstName}
          sx={inputStyles}
          />
        <TextField
          label="Last Name"
          variant={!errors.lastName && isSuccess ? 'filled' : 'standard'}
          value={lastName}
          onChange={(e) => handleChange('lastName',e.target.value)}
          helperText={errors.lastName}
          error={!!errors.lastName}
          sx={inputStyles}
        />
        </Stack>
        <Stack direction='row' spacing={2} display={'flex'} justifyContent={'space-between'} sx={{w:'100%'}}>
        <TextField
          label="Email"
          variant={!errors.email && isSuccess ? 'filled' : 'standard'}
          value={email}
          onChange={(e) => handleChange('email',e.target.value)}
          helperText={errors.email}
          error={!!errors.email}
          sx={inputStyles}
        />
        <TextField
          label="Username"
          variant={!errors.userName && isSuccess ? 'filled' : 'standard'}
          value={userName}
          onChange={(e) => handleChange('userName',e.target.value)}
          helperText={errors.userName}
          error={!!errors.userName}
          sx={inputStyles}
        />
        </Stack>
        <TextField
          id='component-mobile'
          label='Mobile Number'
          variant={!errors.mobile && isSuccess ? 'filled' : 'standard'}
          value={mobile}
          onChange={(e) => handleChange('mobile', e.target.value)}
          helperText={errors.mobile}
          error={!!errors.mobile}
          InputProps={{
            inputComponent: MobileValidation, // Use MobileValidation component as the input
          }}
          sx={mobileInputStyle}
        />
      <Box display={'flex'} justifyContent={'center'} sx={{transform:'translateY(-20px)'}}  >
      {/* SAVE ACCOUNT INFORMATION */}
        <SaveAccountButton />
      </Box>
    </Stack>
  </Box>
  )
}

export default EditAccountForm