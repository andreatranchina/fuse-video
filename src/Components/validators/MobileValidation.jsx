import React from 'react';
import PhoneInput from 'react-phone-number-input'
import { useDispatch, useSelector } from 'react-redux'
import { editAccountField } from '../../redux/account/account.actions';
import 'react-phone-number-input/style.css'

const MobileValidation = () => {
  const dispatch = useDispatch()
  const { mobile, country } = useSelector((state) => state.account)

  const handlePhoneNumberChange = (fieldName, newValue) => {
    dispatch(editAccountField(fieldName, newValue));
  }
    

  return (
    <>
    <PhoneInput
          id='component-mobile'
          value={mobile}
          onChange={(mobileNumber) => handlePhoneNumberChange('mobile',mobileNumber)}
          onCountryChange={(selectedCountryCode) => handlePhoneNumberChange('country',selectedCountryCode)}
          country={country}
          style={{height:'60px', transform:'translate(13px,10px)', width: '90%'}}
          specialLabel='Mobile Phone'
        />
    </>
  );
}

export default MobileValidation;