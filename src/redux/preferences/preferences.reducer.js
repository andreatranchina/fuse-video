import { EDIT_PREFERRED_LANGUAGE, ADD_TOPIC, DELETE_TOPIC, FLAG_PREFERENCES_ERRORS, SUBMIT_PREFERENCES_SUCCESS, SUBMIT_PREFERENCES_FAIL, UNFLAG_PREFERENCES_ERRORS, TOGGLE_IS_DEACTIVATED, TOGGLE_IS_PRIVATE } from './preferences.types'

// Profile: Bio, username, topics, location(city, state if US) homecountry
const INITIAL_PREFERENCES_STATE = {
	language:'',
    isDeactivated: false,
    isPrivate: false,
    topics:[],
	errors: {
		language:'',
        topics:'',
	},
	isSuccess: false,
};

const preferencesReducer = (state = INITIAL_PREFERENCES_STATE, action) => {
	switch(action.type) {
		case EDIT_PREFERRED_LANGUAGE: 
			return { 
				...state, 
				language: action.payload
			};
        case ADD_TOPIC:
            return { ...state, topics: [...state.topics, action.payload] };
        case DELETE_TOPIC:
            return {
                ...state,
                topics: state.topics.filter((topic) => topic.id !== action.payload),
            };
		case FLAG_PREFERENCES_ERRORS:
            return { 
                ...state, 
                errors: { ...state.errors, ...action.payload }
            };
        case UNFLAG_PREFERENCES_ERRORS:
            return {
                ...state,
                errors: {}
            }
        case TOGGLE_IS_DEACTIVATED:
            return {
                ...state,
                isDeactivated: !state.isDeactivated
            };
        case TOGGLE_IS_PRIVATE:
            return {
                ...state,
                isPrivate: !state.isPrivate
            }
		case SUBMIT_PREFERENCES_SUCCESS:
            return {
                ...state, isSuccess: true
            };
		case SUBMIT_PREFERENCES_FAIL:
			return {
				...state, isSuccess: false
			};
		default:
			return state;
	}
};

export default preferencesReducer