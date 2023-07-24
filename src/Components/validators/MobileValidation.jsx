import React, { useState } from 'react';
import { parsePhoneNumberFromString, isValidNumber, format } from 'libphonenumber-js';
import { editFormField, flagErrors } from '../../redux/forms/forms.actions';
import PhoneInput from 'react-phone-number-input'
import { useDispatch, useSelector } from 'react-redux'
import 'react-phone-number-input/style.css'

const MobileValidation = () => {
  // const [mobileToValidate, setMobileToValidate] = useState('');
  // const [isValidMobileNumber, setIsValidMobileNumber] = useState(false);
  const dispatch = useDispatch()
  const mobile = useSelector((state) => state.forms.mobile)
  const userMobile = useSelector((state) => state.user.defaultUser?.mobileNumber)

  const handlePhoneNumberChange = (event) => {
    const newMobileNumber = event.target.value;
    // setMobileToValidate(newMobileNumber);

    // Parse the phone number
    const mobileNumberInstance = parsePhoneNumberFromString(newMobileNumber);

    // Check if the phone number is valid, using the isValidNumber methom react-phone-number-input
    const isValid = mobileNumberInstance ? isValidNumber(mobileNumberInstance) : false;
    // setIsValidMobileNumber(isValid);

    // Format the phone number if it's valid
    if (isValid) {
      const formatted = format(mobileNumberInstance, 'E.164');
      dispatch(editFormField('mobile',formatted))
    } else {
     //get the phone number already in the account
    //  dispatch(editFormField('mobile',userMobile))
      dispatch(flagErrors({ mobile: 'Invalid mobile number'}))
    }
  };

  return (
    <>
    <PhoneInput
          id='component-mobile'
          placeholder={mobile}
          onChange={(e) => handlePhoneNumberChange(e)}
        />
    </>
  );
}

export default MobileValidation;