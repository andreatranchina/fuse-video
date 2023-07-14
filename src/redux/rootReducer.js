import { combineReducers } from "redux"
import userReducer from "./user/user.reducer"

//function takes in object of all reducers to combine,
//taking a key value pair 
const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer