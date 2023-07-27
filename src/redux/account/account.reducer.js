import { EDIT_ACCOUNT_FIELD, FLAG_ACCOUNT_ERRORS, UNFLAG_ACCOUNT_ERRORS, SUBMIT_ACCOUNT_SUCCESS, SUBMIT_ACCOUNT_FAIL } from './account.types'

const INITIAL_ACCOUNT_STATE = {
	firstName: '',
	lastName: '',
	email: '',
	mobile: ' ',
	userName:'',
	password:'',
	country:'',
	errors: {
		firstName: '',
		lastName: '',
		userName:'',
		email: '',
		mobile: '',
		password: '',
		country:'',
	},
	isSuccess: false,
};

const accountReducer = (state = INITIAL_ACCOUNT_STATE, action) => {
	switch(action.type) {
		case EDIT_ACCOUNT_FIELD: 
			return { 
				...state, 
				[action.payload.fieldName] : action.payload.newValue
			};
		case FLAG_ACCOUNT_ERRORS:
			return { 
				...state, 
				errors: { ...state.errors, ...action.payload }
			};
		case UNFLAG_ACCOUNT_ERRORS:
			return { 
				...state, 
				errors: {}
			};
		case SUBMIT_ACCOUNT_SUCCESS:
			return {
				...state, isSuccess: true
			};
		case SUBMIT_ACCOUNT_FAIL:
			return {
				...state, isSuccess: false
			};
		default:
			return state;
	}
};

export default accountReducer