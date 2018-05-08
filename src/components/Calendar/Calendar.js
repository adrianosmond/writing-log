import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadWordCounts } from '../../actions/stats';

import {
  getMonth,
  getNumDaysInMonth,
  makeDateString,
  padWithZero,
} from '../../constants/utils';

import * as routes from '../../constants/routes';

import './Calendar.css';

const writingData = (wordCounts) => {
  const dates = Object.keys(wordCounts);
  if (dates.length === 0) {
    return {
      writingDates: {},
      earliestMonth: 0,
      earliestYear: 0,
    };
  }

  const earliestDate = new Date(dates[0]);

  return {
    writingDates: wordCounts,
    earliestMonth: earliestDate.getMonth(),
    earliestYear: earliestDate.getFullYear(),
  };
};

const createDays = (month, year) => {
  let i;
  const days = [];
  const monthStr = padWithZero(month + 1);
  const numDaysFromPrevMonth = new Date(`${year}-${monthStr}-01`).getDay() - 1;

  if (numDaysFromPrevMonth > 0) {
    const prevMonth = month - 1 === -1 ? 11 : month - 1;
    const prevYear = month - 1 === -1 ? year - 1 : year;
    const numDaysInPrevMonth = getNumDaysInMonth(prevMonth, prevYear);

    for (i = numDaysInPrevMonth - numDaysFromPrevMonth; i < numDaysInPrevMonth; i += 1) {
      days.push({
        day: i,
        key: `${i}-${prevMonth}`,
        classes: 'calendar__day calendar__day--different-month',
      });
    }
  }

  for (i = 1; i <= getNumDaysInMonth(month, year); i += 1) {
    const dayStr = padWithZero(i);
    days.push({
      day: i,
      date: `${year}-${monthStr}-${dayStr}`,
      key: `${i}-${month}`,
      classes: 'calendar__day',
    });
  }

  for (i = 1; days.length % 7 !== 0; i += 1) {
    days.push({
      day: i,
      key: `${i}-${month + 1}`,
      classes: 'calendar__day calendar__day--different-month',
    });
  }

  return days;
};

class Calendar extends Component {
  constructor(props) {
    super(props);

    const today = new Date();

    this.state = {
      dateToday: makeDateString(today),
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
      latestMonth: today.getMonth(),
      latestYear: today.getFullYear(),
      daysInMonth: createDays(today.getMonth(), today.getFullYear()),
      ...writingData(props.wordCounts),
    };

    this.props.loadWordCounts(this.props.user);
  }

  componentWillReceiveProps(newProps) {
    this.setState(writingData(newProps.wordCounts));
  }

  previousMonth() {
    let m = this.state.currentMonth;
    let y = this.state.currentYear;
    m -= 1;
    if (m === -1) {
      m = 11;
      y -= 1;
    }
    this.setState({
      currentMonth: m,
      currentYear: y,
      daysInMonth: createDays(m, y),
    });
  }

  nextMonth() {
    let m = this.state.currentMonth;
    let y = this.state.currentYear;
    m += 1;
    if (m === 12) {
      m = 0;
      y += 1;
    }
    this.setState({
      currentMonth: m,
      currentYear: y,
      daysInMonth: createDays(m, y),
    });
  }

  showingEarliestMonth() {
    return this.state.currentMonth === this.state.earliestMonth &&
            this.state.currentYear === this.state.earliestYear;
  }

  showingLatestMonth() {
    return this.state.currentMonth === this.state.latestMonth &&
            this.state.currentYear === this.state.latestYear;
  }

  renderDay(day) {
    if (day.date === this.state.dateToday) {
      return <Link key={day.key} to={routes.WRITING}
        className="calendar__day calendar__day--today">{day.day}</Link>;
    }

    if (this.state.writingDates[day.date]) {
      return <Link key={day.key} to={`${routes.WRITING}/${day.date}`}
        className="calendar__day calendar__day--active">{day.day}</Link>;
    }

    return <div key={day.key} className={day.classes}>{day.day}</div>;
  }

  render() {
    return (
      <section className="calendar">
        <h1 className="calendar__heading">Calendar</h1>
        <div className="calendar__wrapper">
          <div className="calendar__month">
            <button onClick={this.previousMonth.bind(this)}
              className="calendar__change-month calendar__change-month--prev"
              disabled={this.showingEarliestMonth()}>&lt;</button>
            <div className="calendar__month-name">
              {getMonth(this.state.currentMonth)} {this.state.currentYear}
            </div>
            <button onClick={this.nextMonth.bind(this)}
              className="calendar__change-month calendar__change-month--next"
              disabled={this.showingLatestMonth()}>&gt;</button>
          </div>
          <div className="calendar__weekdays">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) =>
              <div className="calendar__weekday" key={idx}>{day}</div>)}
          </div>
          <div className="calendar__days">
            {this.state.daysInMonth.map(this.renderDay.bind(this))}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  wordCounts: state.stats.wordCounts,
});

const mapDispatchToProps = dispatch => ({
  loadWordCounts: user => dispatch(loadWordCounts(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
