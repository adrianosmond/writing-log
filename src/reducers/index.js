import { combineReducers } from 'redux';
import sessionReducer from './session';
import wordsReducer from './words';

const rootReducer = combineReducers({
  session: sessionReducer,
  words: wordsReducer,
});

export default rootReducer;
