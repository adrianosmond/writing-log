const INITIAL_STATE = {
  loading: true,
  words: {},
  wordCount: {},
};

function wordsReducer(state = INITIAL_STATE, action) {
  const newState = { ...state };
  switch (action.type) {
    case 'SET_LOADING': {
      newState.loading = action.loading;
      return newState;
    }

    case 'SET_WORDS': {
      newState.words = {
        ...state.words,
        [action.date]: action.words,
      };
      return newState;
    }

    case 'SET_WORD_COUNT': {
      newState.wordCount = {
        ...state.wordCount,
        [action.date]: action.numWords,
      };
      return newState;
    }

    case 'SET_WORD_COUNTS': {
      newState.wordCount = Object.assign({}, newState.wordCount, action.wordCounts);
      return newState;
    }

    default:
      return state;
  }
}

export default wordsReducer;
