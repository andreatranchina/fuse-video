import { EDIT_FORM_FIELD, FLAG_ERRORS, SUBMIT_SUCCESS, SUBMIT_FAIL } from './forms.types'

export const editFormField = (fieldName, newValue) => ({
    type: EDIT_FORM_FIELD,
    payload: { fieldName, newValue }
});

export const flagErrors = (errors) => ({
    type: FLAG_ERRORS,
    payload: errors
});

export const submitSuccess = () => {
    console.log('success from redux forms')
    return {
        type: SUBMIT_SUCCESS
    }
};

export const submitFail = () => {
    console.log('failure from redux forms')
    return{
        type: SUBMIT_FAIL
    }
}