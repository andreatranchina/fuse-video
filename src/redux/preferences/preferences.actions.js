import { EDIT_PREFERRED_LANGUAGE, ADD_TOPIC, DELETE_TOPIC, FLAG_PREFERENCES_ERRORS, SUBMIT_PREFERENCES_SUCCESS, SUBMIT_PREFERENCES_FAIL, UNFLAG_PREFERENCES_ERRORS, TOGGLE_IS_DEACTIVATED, TOGGLE_IS_PRIVATE } from './preferences.types'

export const editPreferredLanguage = (newLanguage) => ({
    type: EDIT_PREFERRED_LANGUAGE,
    payload: newLanguage
});

export const addTopic = (topic) => ({
    type: ADD_TOPIC,
    payload: topic
})

export const deleteTopic = (topic) => ({
    type: DELETE_TOPIC,
    payload: topic
})

export const toggleIsDeactivated = () => ({
    type: TOGGLE_IS_DEACTIVATED
})

export const toggleIsPrivate = () => ({
    type: TOGGLE_IS_PRIVATE
})

export const flagPreferencesErrors = (errors) => ({
    type: FLAG_PREFERENCES_ERRORS,
    payload: errors
});

export const unflagPreferencesErrors = (errors) => ({
    type: UNFLAG_PREFERENCES_ERRORS,
    payload: errors
});

export const submitPreferencesSuccess = () => ({
    type: SUBMIT_PREFERENCES_SUCCESS
});

export const submitPreferencesFail = () => ({
    type: SUBMIT_PREFERENCES_FAIL
})