const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const numDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const levels = ['?', 'I', 'II', 'III', 'IV', 'V', 'VI'];

export const padWithZero = (number) => {
  if (number.toString().length === 1) return `0${number}`;
  return `${number}`;
};

export const countWords = (string) => {
  const trimmed = string.trim();
  return (trimmed.length === 0) ? 0 :
    trimmed.replace(/\s+/gi, ' ').split(' ').length;
};

export const getDayInitial = date => days[new Date(date).getDay()];

export const getLevelLongestStreak = (longestStreak) => {
  if (longestStreak >= 50) {
    return 6;
  } else if (longestStreak >= 28) {
    return 5;
  } else if (longestStreak >= 14) {
    return 4;
  } else if (longestStreak >= 7) {
    return 3;
  } else if (longestStreak >= 3) {
    return 2;
  } else if (longestStreak >= 2) {
    return 1;
  }
  return 0;
};

export const getLevelMaxWords = (maxWords) => {
  if (maxWords >= 2500) {
    return 6;
  } else if (maxWords >= 1500) {
    return 5;
  } else if (maxWords >= 1000) {
    return 4;
  } else if (maxWords >= 750) {
    return 3;
  } else if (maxWords >= 500) {
    return 2;
  } else if (maxWords >= 300) {
    return 1;
  }
  return 0;
};

export const getLevelTotalWords = (totalWords) => {
  if (totalWords >= 100000) {
    return 6;
  } else if (totalWords >= 50000) {
    return 5;
  } else if (totalWords >= 20000) {
    return 4;
  } else if (totalWords >= 10000) {
    return 3;
  } else if (totalWords >= 5000) {
    return 2;
  } else if (totalWords >= 1000) {
    return 1;
  }
  return 0;
};

export const getLevelText = level => levels[level];

export const getMonth = m => months[m];

export const getNumDaysInMonth = (month, year) => {
  if (year % 4 === 0 && month === 1) {
    return 29;
  }
  return numDaysPerMonth[month];
};

/* eslint-disable no-useless-escape */
export const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
/* eslint-enable no-useless-escape */

export const makeDateString = date =>
  `${date.getFullYear()}-${padWithZero(date.getMonth() + 1)}-${padWithZero(date.getDate())}`;

export const makeDateText = (date) => {
  const d = new Date(date);
  let suffix = 'th';
  const day = d.getDate();
  const dayMod10 = day % 10;
  if (dayMod10 === 1 && day !== 11) {
    suffix = 'st';
  } else if (dayMod10 === 2 && day !== 12) {
    suffix = 'nd';
  } else if (dayMod10 === 3 && day !== 13) {
    suffix = 'rd';
  }
  return `${day + suffix} ${getMonth(d.getMonth())} ${d.getFullYear()}`;
};
