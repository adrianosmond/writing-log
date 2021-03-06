import { database } from '../lib/firebase';

export function setTagsForDate(date, tags) {
  return {
    type: 'SET_TAGS_FOR_DATE',
    date,
    tags,
  };
}

export function setDatesForTag(tag, dates) {
  return {
    type: 'SET_DATES_FOR_TAG',
    tag,
    dates,
  };
}

export function setAllTags(tags) {
  return {
    type: 'SET_ALL_TAGS',
    tags,
  };
}

export function addTagToDate(date, tag) {
  return {
    type: 'ADD_TAG_TO_DATE',
    date,
    tag,
  };
}

export function removeTagFromDate(date, tag) {
  return {
    type: 'REMOVE_TAG_FROM_DATE',
    date,
    tag,
  };
}

export function addTag(user, date, tag) {
  return (dispatch) => {
    database.ref(`users/${user}/tagDates/${date}/${tag}`).set(true);
    dispatch(addTagToDate(date, tag));
    database.ref(`users/${user}/tags/${tag}/${date}`).set(true);
  };
}

export function removeTag(user, date, tag) {
  return (dispatch) => {
    database.ref(`users/${user}/tagDates/${date}/${tag}`).set(null);
    dispatch(removeTagFromDate(date, tag));
    database.ref(`users/${user}/tags/${tag}/${date}`).set(null);
  };
}

export function loadTagsForDate(user, date) {
  return (dispatch) => {
    database.ref(`users/${user}/tagDates/${date}`).once('value', (result) => {
      const tags = result.val() ? Object.keys(result.val()) : [];
      dispatch(setTagsForDate(date, tags));
    });
  };
}

export function loadDatesForTag(user, tag) {
  return (dispatch) => {
    database.ref(`users/${user}/tags/${tag}`).once('value', (result) => {
      const dates = result.val() ? Object.keys(result.val()) : [];
      dispatch(setDatesForTag(tag, dates));
    });
  };
}

export function loadAllTags(user) {
  return (dispatch) => {
    database.ref(`users/${user}/tags`).once('value', (result) => {
      const tags = result.val() || {};
      dispatch(setAllTags(tags));
    });
  };
}
