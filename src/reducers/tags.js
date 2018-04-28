const INITIAL_STATE = {
  tagDates: {},
  tags: {},
};

function tagsReducer(state = INITIAL_STATE, action) {
  const newState = { ...state };
  switch (action.type) {
    case 'SET_TAGS_FOR_DATE': {
      newState.tagDates = {
        ...newState.tagDates,
        [action.date]: action.tags,
      };
      return newState;
    }

    case 'SET_DATES_FOR_TAG': {
      newState.tags = {
        ...newState.tags,
        [action.tag]: action.dates,
      };
      return newState;
    }

    case 'ADD_TAG_TO_DATE': {
      newState.tagDates = {
        ...newState.tagDates,
        [action.date]: [
          ...newState.tagDates[action.date],
          action.tag,
        ],
      };
      return newState;
    }

    case 'REMOVE_TAG_FROM_DATE': {
      const tagDate = newState.tagDates[action.date];
      if (!tagDate) return newState;

      const index = tagDate.indexOf(action.tag) < 0;
      if (index < 0) return newState;

      newState.tagDates = {
        ...newState.tagDates,
        [action.date]: [
          ...tagDate.slice(0, index),
          ...tagDate.slice(index + 1),
        ],
      };

      return newState;
    }

    default:
      return state;
  }
}

export default tagsReducer;
