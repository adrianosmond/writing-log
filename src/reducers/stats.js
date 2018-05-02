const INITIAL_STATE = {
  wordCounts: {},
  longestStreak: 0,
  maxWords: 0,
  totalWords: 0,
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
      newState.wordCounts = {
        ...state.wordCounts,
        [action.date]: action.numWords,
      };
      return newState;
    }

    case 'SET_WORD_COUNTS': {
      newState.wordCounts = Object.assign({}, newState.wordCounts, action.wordCounts);
      return newState;
    }

    case 'SET_LONGEST_STREAK': {
      newState.longestStreak = action.longestStreak;
      return newState;
    }

    case 'SET_MAX_WORDS': {
      newState.maxWords = action.maxWords;
      return newState;
    }

    case 'SET_TOTAL_WORDS': {
      newState.totalWords = action.totalWords;
      return newState;
    }

    default:
      return state;
  }
}

export default wordsReducer;
