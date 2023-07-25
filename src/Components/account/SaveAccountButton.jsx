import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'
import { useThemeContext } from '../../theme/ThemeContextProvider'
import { editAccountThunk } from '../../redux/user/user.actions'
import { editFormField, submitSuccess, submitFail, flagErrors } from '../../redux/forms/forms.actions'
import { parsePhoneNumber, isValidNumber, format } from 'libphonenumber-js';


const SaveAccountButton = () => {
	const dispatch = useDispatch();
	const { firstName, lastName, email, isSuccess, errors, mobile, country } = useSelector((state) => state.forms)
	const userId = useSelector((state) => state.user.defaultUser.id)
	const { theme } = useThemeContext();

	 const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
        // Handle the case when the phone number is not valid
        dispatch(flagErrors({ mobile: 'Invalid mobile number' }));
      }
    } catch (error) {
      // Handle any exceptions that occur during phone number parsing
      dispatch(flagErrors({ mobile: 'Error parsing phone number' }));
    }
  }

    const areErrorsEmpty = Object.values(errors).every((value) => value === '');

    if (areErrorsEmpty){
      dispatch(submitSuccess());
      const editedAccount = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        country: country
      }
      dispatch(editAccountThunk(userId, editedAccount));
      //editUserInfo(firstName, lastName, email, mobile, errors, isSuccess);
    } else {
      dispatch(submitFail());
    }
  }

  return (
    <>
			<Button onClick={handleSave} 
				sx={{ maxWidth: '100px', 
							maxHeight: '30px', 
							minWidth: '30px', 
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
								WebkitTextStrokeWidth: '2px', 
								WebkitTextStrokeColor:`${theme.palette.button.main}`,
								':hover':{
									WebkitTextStrokeColor:`${theme.palette.background.paper}`}}}>
							Save
					</Typography>
			</Button>
    </>
  )
}

export default SaveAccountButton