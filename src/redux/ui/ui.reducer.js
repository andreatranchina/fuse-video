import { TOGGLE_MODAL, SET_SETTINGS_TAB } from './ui.types'

export const INITIAL_UI_STATE = {
    modalIsOpen: false,
    settingsTabValue: 0,
}

const uiReducer = (state = INITIAL_UI_STATE, action) => {
    switch (action.type){
        case TOGGLE_MODAL:
            return { ...state, modalIsOpen: !state.modalIsOpen}
        case SET_SETTINGS_TAB:
            return { ...state, settingsTabValue: action.payload}
        default :
            return state;
    }
}

export default uiReducer