import { database } from '../lib/firebase';
import { GOAL_TARGET, DAY_IN_MS } from '../constants/constants';
import { makeDateString } from '../constants/utils';

export function setLoading(loading) {
  return {
    type: 'SET_LOADING',
    loading,
  };
}

export function setWords(date, words) {
  return {
    type: 'SET_WORDS',
    date,
    words,
  };
}

export function loadWords(user, date) {
  return (dispatch) => {
    dispatch(setLoading(true));
    database.ref(`users/${user}/words/${date}`).once('value', (result) => {
      const words = result.val() || '';
      dispatch(setWords(date, words));
      dispatch(setLoading(false));
    });
  };
}

export function saveWords(user, date, words) {
  return () => {
    database.ref(`users/${user}/words/${date}`).set(words);
  };
}

export function removeStreak(user) {
  return () => {
    database.ref(`users/${user}/streaksince/`).set(null);
  };
}

export function setStreak(user, date) {
  return () => {
    database.ref(`users/${user}/streaksince/`).set(date);
  };
}

export function setLongestStreak(user, streakLength) {
  return () => {
    database.ref(`users/${user}/longeststreak/`).set(streakLength);
  };
}

export function checkLongestStreak(user, streakLength) {
  return (dispatch) => {
    database.ref(`users/${user}/longeststreak/`).once('value', (result) => {
      const longestStreak = result.val();
      if (streakLength > longestStreak) {
        dispatch(setLongestStreak(user, streakLength));
      }
    });
  };
}

export function calculateStreak(user, wordCounts) {
  return (dispatch) => {
    database.ref(`users/${user}/streaksince/`).once('value', (result) => {
      const streakStart = result.val();
      const dateKeys = Object.keys(wordCounts);

      // We need at least 2 entries to have a streak
      if (dateKeys.length < 2) return;

      const yesterdayDate = makeDateString(new Date(new Date().getTime() - DAY_IN_MS));
      const yesterdayCount = dateKeys[yesterdayDate] || 0;

      if (streakStart === null) {
        // if we don't have a streak yet, check to see if we need to set one up
        if (yesterdayCount >= GOAL_TARGET) {
          dispatch(setStreak(user, yesterdayDate));
        }
      // if we have a streak, check to see if we need to end it
      } else if (yesterdayCount < GOAL_TARGET) {
        dispatch(removeStreak(user));
        // if the last recorded count was higher than the target, check to see if we're needing
        // update the longest streak
        const previousSessionDate = dateKeys[dateKeys.length - 1];
        const previousSessionCount = wordCounts[previousSessionDate] || 0;
        if (previousSessionCount > GOAL_TARGET) {
          const streakStartTime = new Date(streakStart).getTime();
          const streakEndTime = new Date(previousSessionDate).getTime();
          const streakLength = 1 + ((streakEndTime - streakStartTime) / DAY_IN_MS);
          dispatch(checkLongestStreak(user, streakLength));
        }
      }
    });
  };
}

export function setWordCount(date, numWords) {
  return {
    type: 'SET_WORD_COUNT',
    date,
    numWords,
  };
}

export function setWordCounts(wordCounts) {
  return {
    type: 'SET_WORD_COUNTS',
    wordCounts,
  };
}

export function loadWordCounts(user, limit = null) {
  return (dispatch) => {
    let ref = database.ref(`users/${user}/wordcount/`);
    if (limit) ref = ref.limitToLast(limit);
    ref.once('value', (result) => {
      const wordCounts = result.val();
      if (wordCounts) {
        dispatch(setWordCounts(wordCounts));
        dispatch(calculateStreak(user, wordCounts));
      } else {
        dispatch(removeStreak(user));
      }
    });
  };
}

// export function loadWordCount(user, date) {
//   return (dispatch) => {
//     database.ref(`users/${user}/wordcount/${date}`).once('value', (result) => {
//       const numWords = result.val() || 0;
//       dispatch(setWordCount(date, numWords));
//     });
//   };
// }

export function saveWordCount(user, date, numWords) {
  return () => {
    database.ref(`users/${user}/wordcount/${date}`).set(numWords);
  };
}
