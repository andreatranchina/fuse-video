import { EDIT_PROFILE_FIELD, FLAG_PROFILE_ERRORS, SUBMIT_PROFILE_SUCCESS, SUBMIT_PROFILE_FAIL, UNFLAG_PROFILE_ERRORS } from './profile.types'

// Profile: Bio, username, topics, location(city, state if US) homecountry
const INITIAL_PROFILE_STATE = {
	bio:'',
    city:'',
    currentState:'',
	errors: {
		bio:'',
        city:'',
        currentState:'',
	},
	isSuccess: false,
};

const profileReducer = (state = INITIAL_PROFILE_STATE, action) => {
	switch(action.type) {
		case EDIT_PROFILE_FIELD: 
			return { 
				...state, 
				[action.payload.fieldName] : action.payload.newValue
			};
		case FLAG_PROFILE_ERRORS:
            return { 
                ...state, 
                errors: { ...state.errors, ...action.payload }
            };
        case UNFLAG_PROFILE_ERRORS:
            return {
                ...state,
                errors: {}
            }
		case SUBMIT_PROFILE_SUCCESS:
            return {
                ...state, isSuccess: true
            };
		case SUBMIT_PROFILE_FAIL:
			return {
				...state, isSuccess: false
			};
		default:
			return state;
	}
};

export default profileReducer