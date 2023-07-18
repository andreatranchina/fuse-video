import { MESSAGE_TRANSLATE, STREAM_TRANSLATE, SITE_TRANSLATE, FETCH_LANGUAGE_PREFERENCES } from "./translation.types";

export const INITIAL_LANGUAGE_STATE = {
    messageLanguage : '',
    streamLanguage : '',
    siteLanguage : '',
};

export default function translationReducer(state = INITIAL_LANGUAGE_STATE, action) {
    switch (action.type) {
      case MESSAGE_TRANSLATE:
        return {
          ...state,
          messageLanguage: action.payload,
      };
      case STREAM_TRANSLATE:
        return {
          ...state,
          messageLanguage: action.payload,
      };
      case SITE_TRANSLATE:
        return {
          ...state,
          messageLanguage: action.payload,
      };
      case FETCH_LANGUAGE_PREFERENCES:
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  }