import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'
import { useThemeContext } from '../../../theme/ThemeContextProvider'
import { editAccountThunk, fetchUserByIdThunk,  } from '../../../redux/user/user.actions'
import { editAccountField, submitAccountSuccess, submitAccountFail, flagAccountErrors, unflagAccountErrors } from '../../../redux/account/account.actions'
import { parsePhoneNumber, isValidNumber } from 'libphonenumber-js';


const SaveAccountButton = () => {
	const dispatch = useDispatch();
	const { firstName, lastName, email, userName, errors, mobile, country, isSuccess } = useSelector((state) => state.account)
	const userId = useSelector((state) => state.user.defaultUser?.id)
	const { theme } = useThemeContext();

  const hasWhiteSpace = (entry) => {
    const whitespaceRegex = /[ \t\n\r]/;
    return whitespaceRegex.test(entry)
  }
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleFirstNameSave = async() => {
    if (firstName === '' || hasWhiteSpace(firstName)){
    //get user's first name from database and input into account redux
     dispatch(flagAccountErrors({ firstName: 'Enter your first name'})) 
    } else {
    dispatch(editAccountField('firstName', firstName))
    }
  }

  const handleLastNameSave = async() => {
     if (lastName === '' || hasWhiteSpace(lastName)){
    //get user's first name from database and input into account redux
     dispatch(flagAccountErrors({ lastName: 'Enter your last name'})) 
    } else {
    dispatch(editAccountField('lastName', lastName))
    }
  }

  const handleEmailSave = async() => {
    if (email === '' || hasWhiteSpace(email)){
    //flag the email field if it was left empty
      dispatch(flagAccountErrors({ email: 'Enter your email'}))
    }
    else if (!isValidEmail(email)){
      //flag to user that they input an invalid email
      dispatch(flagAccountErrors({ email: 'Invalid Email'})) 
    }
    else {
      //update the account email
      dispatch(editAccountField('email',email))
    }
  } 
 
  const handleUserNameSave = async() => {
    if (userName === '' || hasWhiteSpace(userName)){
      //flag the username field as being empty
      dispatch(flagAccountErrors({userName:'Pick a username'}))
    } else {
      //edit the username 
      dispatch(editAccountField('userName',userName))
      console.log('assigned a new username')
    }
  }

  const handleMobileSave = async() => {
    if (mobile === '' || hasWhiteSpace(mobile)) {
      // If the mobile number is empty (only whitespace), dispatch an error message for the mobile field
      dispatch(flagAccountErrors({ mobile: 'Please input a mobile number without area code' }));
  } else {
    try {
      // Parse the phone number
      const mobileNumberInstance = parsePhoneNumber(mobile, country);

      // Check if the phone number is valid, using the isValidNumber method from react-phone-number-input
      const isValidMobile = mobileNumberInstance.number ? isValidNumber(mobileNumberInstance.number) : false;
     
      if (isValidMobile) {
        //edit the account mobile number
        dispatch(editAccountField('mobile', mobileNumberInstance.number));
      } else {
        // handle the case when the  phone number is not valid
        dispatch(flagAccountErrors({ mobile: 'Invalid mobile number' }));
      }
    } catch (error) {
      // handle any exceptions that occur during phone number parsing
      dispatch(flagAccountErrors({ mobile: 'Error parsing phone number' }));
    }
  }
  }

  const handleSave =  async (e) => {
    handleFirstNameSave();
    handleLastNameSave();
    handleEmailSave();
    handleUserNameSave();
    handleMobileSave();
    //send data and turn on account success state
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
      console.log(editedAccount)
      await dispatch(editAccountThunk(userId, editedAccount));
      dispatch(submitAccountSuccess());
      dispatch(fetchUserByIdThunk(userId));
    } else {
      dispatch(submitAccountFail());
      dispatch(unflagAccountErrors());
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
									WebkitTextStrokeColor:`${theme.palette.background.fab.hover}`}}}>
							Save
					</Typography>
			</Button>
      
    </>
  )
}

export default SaveAccountButton