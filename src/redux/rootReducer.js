import { combineReducers } from "redux"
import userReducer from "./user/user.reducer"
import translationReducer from "./translation/translation.reducer"

//function takes in object of all reducers to combine,
//taking a key value pair 
const rootReducer = combineReducers({
    user: userReducer,
    translation: translationReducer,
})

export default rootReducer