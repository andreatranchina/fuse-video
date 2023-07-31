import React, { useState } from 'react';
import validator from 'validator';
import { Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { editAccountField, flagAccountErrors } from '../../redux/account/account.actions';

const PasswordValidator = () => {

  const dispatch = useDispatch();
  const password = useSelector((state) => state.user.password)

  const handlePasswordChange = (event) => {

    let newPassword = event.target.value;
    if (validatePassword(newPassword) !== ''){
      dispatch(flagAccountErrors({ passowrd: validatePassword(newPassword)}));
    } 
    dispatch(editAccountField('password',newPassword));
  };

  const validatePassword = (password) => {
    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      return 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase character, one special character, and one digit.';
    }
    return '';
  };

  return (
    <>
      <Input
          id="password-input"
          type="password"
          placeholder={password}
          onChange={handlePasswordChange}
      />
    </>
  );
};

export default PasswordValidator;
