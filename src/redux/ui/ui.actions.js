import { TOGGLE_MODAL, SET_SETTINGS_TAB } from './ui.types'

//pull up modal to display on-screen
export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});

//change the current tab within the edit account information form
export const setSettingsTab = (payload) => ({
    type: SET_SETTINGS_TAB,
    payload: payload
})
