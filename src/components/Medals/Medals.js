import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getLevelLongestStreak,
  getLevelMaxWords,
  getLevelTotalWords,
} from '../../constants/utils';

import {
  loadLongestStreak,
  loadMaxWords,
  loadTotalWords,
} from '../../actions/stats';

import Medal from '../Medal';

import './Medals.css';

class Medals extends Component {
  constructor(props) {
    super(props);

    props.loadLongestStreak(props.user);
    props.loadMaxWords(props.user);
    props.loadTotalWords(props.user);
  }

  render() {
    const {
      longestStreak,
      maxWords,
      totalWords,
      wordCounts,
      writingDate,
    } = this.props;
    const wordsToday = wordCounts[writingDate] || 0;
    const max = Math.max(maxWords, wordsToday);
    const total = totalWords + wordsToday;
    return (
      <section className="medals">
        <h1 className="medals__heading">
          Medals
          <Link to="/medals/" className="medals__all-medals-link">View all medals</Link>
        </h1>
        <div className="medals__wrapper">
          <Medal title="Streak" type="longestStreak"
            level={getLevelLongestStreak(longestStreak)} detail={`${longestStreak} day${longestStreak === 1 ? '' : 's'}`} />
          <Medal title="Max words" type="maxWords"
            level={getLevelMaxWords(max)} detail={`${max} word${max === 1 ? '' : 's'}`} />
          <Medal title="Total words" type="totalWords"
            level={getLevelTotalWords(total)} detail={`${total} word${total === 1 ? '' : 's'}`} />
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  user: state.session.user,
  wordCounts: state.stats.wordCounts,
  longestStreak: state.stats.longestStreak,
  maxWords: state.stats.maxWords,
  totalWords: state.stats.totalWords,
});

const mapDispatchToProps = dispatch => ({
  loadLongestStreak: user => dispatch(loadLongestStreak(user)),
  loadMaxWords: user => dispatch(loadMaxWords(user)),
  loadTotalWords: user => dispatch(loadTotalWords(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Medals);
