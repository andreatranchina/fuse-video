import { EDIT_FORM_FIELD, FLAG_ERRORS, SUBMIT_SUCCESS, SUBMIT_FAIL } from './forms.types'

const INITIAL_FORM_STATE = {
	firstName: ' ',
	lastName: ' ',
	email: ' ',
	mobile: ' ',
	passowrd:' ',
	country:' ',
	errors: {
		firstName: ' ',
		lastName: ' ',
		email: ' ',
		mobile: ' ',
		password: ' ',
		country:' ',
	},
	isSuccess: false,
};

const formReducer = (state = INITIAL_FORM_STATE, action) => {
	switch(action.type) {
		case EDIT_FORM_FIELD: 
			return { 
				...state, 
				[action.payload.fieldName] : action.payload.newValue
			};
		case FLAG_ERRORS:
				return { 
					...state, 
					errors: { ...state.errors, ...action.payload }
				};
		case SUBMIT_SUCCESS:
				return {
					...state, isSuccess: true
				};
		case SUBMIT_FAIL:
			return {
				...state, isSuccess: false
			};
		default:
			return state;
	}
};

export default formReducer