const INITIAL_STATE = {
  loading: true,
  words: {},
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

    default:
      return state;
  }
}

export default wordsReducer;
