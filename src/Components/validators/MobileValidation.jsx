import React from 'react';
import PhoneInput from 'react-phone-number-input'
import { useDispatch, useSelector } from 'react-redux'
import { editFormField } from '../../redux/forms/forms.actions';
import countriesList from 'countries-list';
import 'react-phone-number-input/style.css'

const MobileValidation = () => {
  // const [mobileToValidate, setMobileToValidate] = useState('');
  // const [isValidMobileNumber, setIsValidMobileNumber] = useState(false);
  const dispatch = useDispatch()
  const { mobile, country } = useSelector((state) => state.forms)
  const userMobile = useSelector((state) => state.user.defaultUser?.mobileNumber)

  const handlePhoneNumberChange = (fieldName, newValue) => {
    console.log(newValue);
    dispatch(editFormField(fieldName, newValue));
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