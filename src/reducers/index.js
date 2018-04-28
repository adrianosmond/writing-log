import { combineReducers } from 'redux';
import sessionReducer from './session';
import tagsReducer from './tags';
import wordsReducer from './words';

const rootReducer = combineReducers({
  session: sessionReducer,
  tags: tagsReducer,
  words: wordsReducer,
});

export default rootReducer;
