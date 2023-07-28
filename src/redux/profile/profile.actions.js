import { EDIT_PROFILE_FIELD, FLAG_PROFILE_ERRORS, UNFLAG_PROFILE_ERRORS, SUBMIT_PROFILE_SUCCESS, SUBMIT_PROFILE_FAIL } from './profile.types'

export const editProfileField = (fieldName, newValue) => ({
    type: EDIT_PROFILE_FIELD,
    payload: { fieldName, newValue }
});

export const flagProfileErrors = (errors) => ({
    type: FLAG_PROFILE_ERRORS,
    payload: errors
});

export const unflagProfileErrors = () => ({
    type: UNFLAG_PROFILE_ERRORS,
})

export const submitProfileSuccess = () => {
    console.log('success from redux forms')
    return {
        type: SUBMIT_PROFILE_SUCCESS
    }
};

export const submitProfileFail = () => {
    console.log('failure from redux forms')
    return{
        type: SUBMIT_PROFILE_FAIL
    }
}