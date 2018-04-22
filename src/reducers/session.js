const INITIAL_STATE = {
  user: null,
};

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      return state;
  }
}

export default sessionReducer;
