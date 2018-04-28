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
    let processedWords = words.trim();
    if (processedWords.length === 0) {
      processedWords = null;
    }
    database.ref(`users/${user}/words/${date}`).set(processedWords);
  };
}

export function saveLongestStreak(user, longestStreak) {
  return () => {
    database.ref(`users/${user}/longestStreak/`).set(longestStreak);
  };
}

export function setLongestStreak(longestStreak) {
  return {
    type: 'SET_LONGEST_STREAK',
    longestStreak,
  };
}

export function loadLongestStreak(user) {
  return (dispatch) => {
    database.ref(`users/${user}/longestStreak/`).once('value', (result) => {
      const longestStreak = result.val() || 0;
      dispatch(setLongestStreak(longestStreak));
    });
  };
}

export function checkLongestStreak(user, streakStart, streakEnd) {
  return (dispatch) => {
    const streakStartTime = new Date(streakStart).getTime();
    const streakEndTime = new Date(streakEnd).getTime();
    const streakToCheck = 1 + ((streakEndTime - streakStartTime) / DAY_IN_MS);
    database.ref(`users/${user}/longestStreak/`).once('value', (result) => {
      const longestStreak = result.val() || 0;
      if (streakToCheck > longestStreak) {
        dispatch(setLongestStreak(streakToCheck));
        dispatch(saveLongestStreak(user, streakToCheck));
      }
    });
  };
}

export function removeStreak(user) {
  return () => {
    database.ref(`users/${user}/streakSince/`).set(null);
  };
}

export function saveStreak(user, date) {
  return () => {
    database.ref(`users/${user}/streakSince/`).set(date);
  };
}

export function calculateStreak(user, wordCounts) {
  return (dispatch) => {
    database.ref(`users/${user}/streakSince/`).once('value', (result) => {
      const streakStart = result.val();
      const dateKeys = Object.keys(wordCounts);

      // We need at least 2 entries to have a streak
      if (dateKeys.length < 2) return;

      const yesterdayDate = makeDateString(new Date(new Date().getTime() - DAY_IN_MS));
      const yesterdayCount = wordCounts[yesterdayDate] || 0;

      if (streakStart === null) {
        // if we don't have a streak yet, check to see if we need to set one up
        if (yesterdayCount >= GOAL_TARGET) {
          dispatch(saveStreak(user, yesterdayDate));
        }
      // if we have a streak, check to see if we need to end it
      } else if (yesterdayCount < GOAL_TARGET) {
        dispatch(removeStreak(user));
        // if the last recorded count was higher than the target, check to see if we're needing
        // update the longest streak
        const previousSessionDate = dateKeys[dateKeys.length - 1];
        const previousSessionCount = wordCounts[previousSessionDate] || 0;
        if (previousSessionCount > GOAL_TARGET) {
          dispatch(checkLongestStreak(user, streakStart, previousSessionDate));
        }
      // if we are continuing a streak, we can still update the longest streak
      } else if (yesterdayCount > GOAL_TARGET) {
        dispatch(checkLongestStreak(user, streakStart, yesterdayDate));
      }
    });
  };
}

export function saveMaxWords(user, maxWords) {
  return () => {
    database.ref(`users/${user}/maxWords/`).set(maxWords);
  };
}

export function setMaxWords(user, maxWords) {
  return {
    type: 'SET_MAX_WORDS',
    maxWords,
  };
}

export function loadMaxWords(user) {
  return (dispatch) => {
    Promise.all([
      database.ref(`users/${user}/maxWords/`)
        .once('value').then(result => result.val() || 0),
      database.ref(`users/${user}/wordCount/`).limitToLast(2)
        .once('value').then(result => result.val()),
    ]).then((results) => {
      const maxWords = results[0];
      const wordCounts = results[1];
      const result = Math.max(...Object.values(wordCounts), maxWords);
      dispatch(setMaxWords(user, result));
      if (result > maxWords) {
        dispatch(saveMaxWords(user, result));
      }
    });
  };
}

export function saveTotalWords(user, totalWords, date) {
  return () => {
    database.ref(`users/${user}/totalWords/`).set({
      count: totalWords,
      upTo: date,
    });
  };
}

export function setTotalWords(user, totalWords) {
  return {
    type: 'SET_TOTAL_WORDS',
    totalWords,
  };
}

export function loadTotalWords(user) {
  return (dispatch) => {
    const today = makeDateString(new Date());
    Promise.all([
      database.ref(`users/${user}/totalWords/`)
        .once('value').then(result => result.val() || ({ count: 0, upTo: '' })),
      database.ref(`users/${user}/wordCount/`).limitToLast(2)
        .once('value').then(result => result.val()),
    ]).then((results) => {
      const totalWords = results[0];
      const wordCounts = results[1];
      const filtered = Object.keys(wordCounts).filter(date =>
        date !== today && date > totalWords.upTo);
      const result = filtered.reduce((total, date) =>
        total + wordCounts[date], totalWords.count);
      dispatch(setTotalWords(user, result));
      if (filtered.length > 0) {
        dispatch(saveTotalWords(user, result, filtered[0]));
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
    let ref = database.ref(`users/${user}/wordCount/`);
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
//     database.ref(`users/${user}/wordCount/${date}`).once('value', (result) => {
//       const numWords = result.val() || 0;
//       dispatch(setWordCount(date, numWords));
//     });
//   };
// }

export function saveWordCount(user, date, numWords) {
  return () => {
    database.ref(`users/${user}/wordCount/${date}`).set(numWords === 0 ? null : numWords);
  };
}
