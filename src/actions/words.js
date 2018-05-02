import { database } from '../lib/firebase';

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
