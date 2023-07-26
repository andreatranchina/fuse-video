import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import { editAccountThunk, fetchUserByIdThunk } from '../../redux/user/user.actions'
import { editFormField, submitSuccess, submitFail, flagErrors } from '../../redux/forms/forms.actions'
import { parsePhoneNumber, isValidNumber } from 'libphonenumber-js';


const SaveAccountButton = () => {
	const dispatch = useDispatch();
	const { firstName, lastName, email, userName, errors, mobile, country, isSuccess } = useSelector((state) => state.forms)
	const userId = useSelector((state) => state.user.defaultUser?.id)
  const oldFirstName = useSelector((state) => state.user.defaultUser?.firstName)
  const oldLastName = useSelector((state) => state.user.defaultUser?.firstName)
  const oldUserName = useSelector((state) => state.user.defaultUser?.userName)
  const oldEmail = useSelector((state) => state.user.defaultUser?.email)
	const { theme } = useThemeContext();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleFirstNameSave = () => {
    if (firstName.trim() === '' && firstName.includes(' ')){
    //get user's first name from database and input into form redux
      dispatch(editFormField('firstName', oldFirstName))
    } else {
    dispatch(editFormField('firstName', firstName))
    }
  }

  const handleLastNameSave = () => {
    if (lastName.trim() === '' && lastName.includes(' ')){
      //get the user's last name from auth and input in redux
      dispatch(editFormField('lastName', oldLastName))
    }
  }

  const handleEmailSave = () => {
    if (email?.trim() === '' || email.includes(' ')){
    //get user's first name from database and input into form redux
      dispatch(editFormField('email', oldEmail))
    }
    if (!isValidEmail(email)){
        dispatch(flagErrors({ email: 'Invalid Email'})) 
      }
    } 
  

  const handleUserNameSave = () => {
    if (userName.trim() === '' || userName.includes(' ') || userName.length===0){
      //get the user's last name from auth and input in redux
      dispatch(editFormField('userName', oldUserName))
      console.log('hit old user name assignment')
    } else {
      dispatch(editFormField('userName',userName))
      console.log('assigned a new username')
    }
  }

  const handleMobileSave = () => {
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

      // Check if the phone number is valid, using the isValidNumber method from react-phone-number-input
      const isValidMobile = mobileNumberInstance.number ? isValidNumber(mobileNumberInstance.number) : false;

      // Format the phone number if it's valid
      if (isValidMobile) {
        dispatch(editFormField('mobile', mobileNumberInstance.number));
      } else {
        // Handle the case when the  phone number is not valid
        dispatch(flagErrors({ mobile: 'Invalid mobile number' }));
      }
    } catch (error) {
      // Handle any exceptions that occur during phone number parsing
      dispatch(flagErrors({ mobile: 'Error parsing phone number' }));
    }
  }
  }

  const handleSave = (e) => {
    handleFirstNameSave();
    console.log(errors);
    handleLastNameSave();
    console.log(errors);
    handleEmailSave();
    console.log(errors);
    handleUserNameSave();
    console.log(errors);
    handleMobileSave();
    console.log(errors);
    //send data and turn on form success state
    if (!errors.firstName && !errors.lastName && !errors.mobile && !errors.email && !errors.userName){
      console.log(`still went through`);
      const editedAccount = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        mobile: mobile,
        country: country,
      }
      dispatch(editAccountThunk(userId, editedAccount));
      dispatch(submitSuccess());
      dispatch(fetchUserByIdThunk(userId));
    } else {
      dispatch(submitFail());
    }
  }

  
  return (
    <>
			<Button onClick={handleSave} 
				sx={{ maxWidth: '200px', 
							maxHeight: '30px', 
							minWidth: '200px', 
							minHeight: '30px', 
							color:`${theme.palette.button.main}`, 
							border:`2px solid ${theme.palette.button.main}`, 
							'&:hover': { 
								backgroundColor:`${theme.palette.button.main}`, 
								color:`${theme.palette.background.paper}`, 
								border:`2px solid ${theme.palette.button.main}`} 
				}}>
					<Typography 
						sx={{fontFamily:`'Bungee Hairline', cursive`, 
								fontWeight:700,  
                width: '100%',
								WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:`${theme.palette.button.main}`,
								':hover':{
									WebkitTextStrokeColor:'white'}}}>
							Save
					</Typography>
			</Button>
    </>
  )
}

export default SaveAccountButton