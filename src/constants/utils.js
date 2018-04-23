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

const padWithZero = (number) => {
  if (number.toString().length === 1) return `0${number}`;
  return `${number}`;
};

const countWords = (string) => {
  const trimmed = string.trim();
  return (trimmed.length === 0) ? 0 :
    trimmed.replace(/\s+/gi, ' ').split(' ').length;
};

const getDayInitial = date => days[new Date(date).getDay()];

const getMonth = m => months[m];

const getNumDaysInMonth = (month, year) => {
  if (year % 4 === 0 && month === 1) {
    return 29;
  }
  return numDaysPerMonth[month];
};

/* eslint-disable no-useless-escape */
const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
/* eslint-enable no-useless-escape */

const makeDateString = date =>
  `${date.getFullYear()}-${padWithZero(date.getMonth() + 1)}-${padWithZero(date.getDate())}`;

const makeDateText = (date) => {
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

export {
  countWords,
  getDayInitial,
  getNumDaysInMonth,
  getMonth,
  isValidEmail,
  makeDateString,
  makeDateText,
  padWithZero,
};
