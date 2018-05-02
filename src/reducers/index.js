import { combineReducers } from 'redux';
import sessionReducer from './session';
import statsReducer from './stats';
import tagsReducer from './tags';
import wordsReducer from './words';

const rootReducer = combineReducers({
  session: sessionReducer,
  stats: statsReducer,
  tags: tagsReducer,
  words: wordsReducer,
});

export default rootReducer;
