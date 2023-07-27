import { EDIT_ACCOUNT_FIELD, FLAG_ACCOUNT_ERRORS, UNFLAG_ACCOUNT_ERRORS, SUBMIT_ACCOUNT_SUCCESS, SUBMIT_ACCOUNT_FAIL } from './account.types'

export const editAccountField = (fieldName, newValue) => ({
    type: EDIT_ACCOUNT_FIELD,
    payload: { fieldName, newValue }
});

export const flagAccountErrors = (errors) => ({
    type: FLAG_ACCOUNT_ERRORS,
    payload: errors
});

export const unflagAccountErrors = (errors) => ({
    type: UNFLAG_ACCOUNT_ERRORS,
    payload: errors
});

export const submitAccountSuccess = () => {
    // console.log('success from redux forms')
    return {
        type: SUBMIT_ACCOUNT_SUCCESS
    }
};

export const submitAccountFail = () => {
    // console.log('failure from redux forms')
    return{
        type: SUBMIT_ACCOUNT_FAIL
    }
}