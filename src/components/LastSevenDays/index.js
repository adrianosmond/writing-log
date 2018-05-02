import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadWordCounts } from '../../actions/stats';
import { getDayInitial, makeDateString } from '../../constants/utils';
import { PARTIAL_GOAL_TARGET, GOAL_TARGET, DAY_IN_MS } from '../../constants/constants';

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

const Day = props =>
  <div>
    <div className="last-seven-days__day-initial">{props.dayName}</div>
    <div className="last-seven-days__num-words">{props.wordCount}</div>
  </div>;

class LastSevenDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSevenDays: makeLastSevenDays(),
      streak: 0,
    };

    props.loadLastSevenDays(props.user);
  }

  componentWillReceiveProps(newProps) {
    const lastSevenDays = this.state.lastSevenDays.map(day => ({
      date: day.date,
      wordCount: newProps.wordCount[day.date] || 0,
    }));

    // TODO - Streak won't go above 8 days with this implementation
    this.setState({
      lastSevenDays,
      streak: (lastSevenDays[0].wordCount > GOAL_TARGET ? 1 : 0) +
        lastSevenDays.slice(1).reverse().reduce((val, curr) => {
          if (curr.wordCount > GOAL_TARGET) {
            return val + 1;
          }
          return 0;
        }, 0),
    });
  }

  render() {
    const { lastSevenDays, streak } = this.state;
    return (
      <section className="last-seven-days">
        <h1 className="last-seven-days__heading">Last 7 Days</h1>
        <div className="last-seven-days__wrapper">
          {lastSevenDays.map((day, idx) => {
            let className = 'last-seven-days__day';
            if (day.wordCount < PARTIAL_GOAL_TARGET) {
              className += ' last-seven-days__day--goal-not-met';
            } else if (day.wordCount < GOAL_TARGET) {
              className += ' last-seven-days__day--goal-nearly-met';
            } else {
              className += ' last-seven-days__day--goal-met';
            }
            return day.wordCount > 0 || idx === 0 ? (
              <Link to={idx === 0 ? '/log/' : `/log/${day.date}`}
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
  wordCount: state.stats.wordCounts,
});

const mapDispatchToProps = dispatch => ({
  loadLastSevenDays: user => dispatch(loadWordCounts(user, 8)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LastSevenDays);
