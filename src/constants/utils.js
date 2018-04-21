
const countWords = (string) => {
	string = string.trim();
	if (string.length === 0) {
		return 0;
	} else {
		return string.replace(/\s+/gi, " ").split(" ").length;
	}
}

const getMonth = (m) => {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return months[m];
};

/* eslint-disable no-useless-escape */
const isValidEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
/* eslint-enable no-useless-escape */

const makeDateString = (date) => {
  var dateString = date.getFullYear() + "-";
  dateString += ((date.getMonth() + 1).toString().length === 1? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-";
  dateString += date.getDate().toString().length === 1? "0" + date.getDate() : date.getDate();
  return dateString;
}

const makeDateText = (date) => {
  var d = new Date(date);
  var suffix = "th";
  var day = d.getDate();
  var dayMod10 = day % 10;
  if (dayMod10 === 1 && day !== 11) {
    suffix = "st";
  } else if (dayMod10 === 2 && day !== 12) {
    suffix = "nd";
  }
  return day + suffix + " " + getMonth(d.getMonth()) + " " + d.getFullYear();
};


export { 
  countWords,
  isValidEmail,
  getMonth,
  makeDateString,
  makeDateText,
};
