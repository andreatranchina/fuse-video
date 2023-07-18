import { combineReducers } from "redux"
import userReducer from "./user/user.reducer"
import translationReducer from "./translations/translation.reducer"
import livestreamReducer from "./livestreams/livestream.reducer"
import messageReducer from "./messages/message.reducer"

//function takes in object of all reducers to combine,
//taking a key value pair 
const rootReducer = combineReducers({
    user: userReducer,
    translations: translationReducer,
    livestreams: livestreamReducer,
    messages: messageReducer,
})

export default rootReducer