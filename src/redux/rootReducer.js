import { combineReducers } from "redux"
import userReducer from "./user/user.reducer"
import translationReducer from "./translations/translation.reducer"
import livestreamReducer from "./livestreams/livestream.reducer"
import messageReducer from "./messages/message.reducer"
import uiReducer from './ui/ui.reducer'
import accountReducer from "./account/account.reducer"
import roomReducer from "./room/room.reducer"
import profileReducer from './profile/profile.reducer'
import preferencesReducer from "./preferences/preferences.reducer"
import photosReducer from "./photos/photos.reducer"

//function takes in object of all reducers to combine,
//taking a key value pair 
const rootReducer = combineReducers({
    user: userReducer,
    translations: translationReducer,
    livestreams: livestreamReducer,
    messages: messageReducer,
    ui: uiReducer,
    account: accountReducer,
    room: roomReducer,
    profile: profileReducer,
    preferences: preferencesReducer,
    photos: photosReducer,
})

export default rootReducer