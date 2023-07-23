import { TOGGLE_MODAL } from './ui.types'

export const INITIAL_UI_STATE = {
    modalIsOpen: false,
}

export default function uiReducer(state = INITIAL_UI_STATE, action) {
    switch (action.type){
        case TOGGLE_MODAL:
            return { ...state, modalIsOpen: !state.modalIsOpen}
        default :
            return state;
    }
}