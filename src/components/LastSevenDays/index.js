import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadWordCounts } from '../../actions/stats';
import { getDayInitial, makeDateString } from '../../constants/utils';
import { PARTIAL_GOAL_TARGET, GOAL_TARGET, DAY_IN_MS } from '../../constants/constants';

import * as routes from '../../constants/routes';

import './index.css';

const makeLastSevenDays = () => {
  const now = new Date();
  const lastSeven = [];
  for (let i = 0; i < 7; i += 1) {
    lastSeven.push({
      date: makeDateString(new Date(now.getTime() - (i * DAY_IN_MS))),
      wordCount: 0,
    });
  }
  return lastSeven;
};

const createStateFromWordCounts = (wordCounts) => {
  const lastSevenDays = makeLastSevenDays().map(day => ({
    date: day.date,
    wordCount: wordCounts[day.date] || 0,
  }));

  // TODO - Streak won't go above 8 days with this implementation
  return {
    lastSevenDays,
    streak: (lastSevenDays[0].wordCount > GOAL_TARGET ? 1 : 0) +
      lastSevenDays.slice(1).reverse().reduce((val, curr) => {
        if (curr.wordCount > GOAL_TARGET) {
          return val + 1;
        }
        return 0;
      }, 0),
  };
};

const Day = props =>
  <div>
    <div className="last-seven-days__day-initial">{props.dayName}</div>
    <div className="last-seven-days__num-words">{props.wordCount}</div>
  </div>;

class LastSevenDays extends Component {
  constructor(props) {
    super(props);
    this.state = createStateFromWordCounts(props.wordCounts);
    props.loadLastSevenDays(props.user);
  }

  componentWillReceiveProps(newProps) {
    this.setState(createStateFromWordCounts(newProps.wordCounts));
    // this.updateWordCounts(newProps.wordCounts);
  }

  render() {
    const { lastSevenDays, streak } = this.state;
    return (
      <section className="last-seven-days">
        <h1 className="last-seven-days__heading">Last 7 Days</h1>
        <div className="last-seven-days__wrapper">
          {lastSevenDays.map((day, idx) => {
            let className = 'last-seven-days__day last-seven-days__day--goal-';
            if (day.wordCount < PARTIAL_GOAL_TARGET) {
              className += 'not-met';
            } else if (day.wordCount < GOAL_TARGET) {
              className += 'nearly-met';
            } else {
              className += 'met';
            }
            return day.wordCount > 0 || idx === 0 ? (
              <Link to={idx === 0 ? routes.WRITING : `${routes.WRITING}/${day.date}`}
                className={className} key={day.date}>
                <Day dayName={getDayInitial(day.date)} wordCount={day.wordCount} />
              </Link>
            ) : (
              <div className={className} key={day.date}>
                <Day dayName={getDayInitial(day.date)} wordCount={day.wordCount} />
              </div>
            );
          })}
        </div>
        <div className="last-seven-days__streak">
          Current streak: {streak} day{streak === 1 ? '' : 's'}
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
  loadLastSevenDays: user => dispatch(loadWordCounts(user, 8)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LastSevenDays);
