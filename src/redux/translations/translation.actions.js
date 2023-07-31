import axios from 'axios'
import { MESSAGE_TRANSLATE, STREAM_TRANSLATE, SITE_TRANSLATE, FETCH_LANGUAGE_PREFERENCES } from "./translation.types";

export const fetchLanguagePreferences = (payload) => {
    return {
        type: FETCH_LANGUAGE_PREFERENCES,
        payload: payload,
    }
}

export const fetchLanguagePreferencesThunk = (userId) => {
    return async(dispatch) => {
        let res;
        try {
            res = await axios.get(`https://video-backend-6mkl.onrender.com/api/user/${userId}`);
            const { messageLanguage, streamLanguage, siteLanguage } = res.data;
            const languagePreferences = {
              messageLanguage,
              streamLanguage,
              siteLanguage,
            };
            dispatch(fetchLanguagePreferences(languagePreferences));
        } catch(error){
            console.log(error)
        }
    }
}

export const changeMessageLanguage = (payload) => {
    return{
        type: MESSAGE_TRANSLATE,
        payload: payload,
    }
}

export const changeMessageLanguageThunk = (userId, newLanguage) => {
    return async (dispatch) => {
    let res;
    try {
        res = await axios.put(`https://video-backend-6mkl.onrender.com/api/user/${userId}`,{
            messageLanguage: newLanguage,
        });
        console.log('changing message language')
        dispatch(changeMessageLanguage(newLanguage));
    } catch(error) {
        console.log(error);
    };
    }
};

export const changeStreamLanguage = (payload) => {
    return{
        type: STREAM_TRANSLATE,
        payload: payload,
    }
}

export const changeSiteLanguage = (payload) => {
    return{
        type: SITE_TRANSLATE,
        payload: payload,
    }
}