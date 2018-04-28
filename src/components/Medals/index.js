import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import {
  getLevelLongestStreak,
  getLevelMaxWords,
  getLevelTotalWords,
} from '../../constants/utils';

import {
  loadLongestStreak,
  loadMaxWords,
  loadTotalWords,
} from '../../actions/words';

import Medal from '../Medal';

import './index.css';

class Medals extends Component {
  constructor(props) {
    super(props);

    this.props.loadLongestStreak(this.props.user);
    this.props.loadMaxWords(this.props.user);
    this.props.loadTotalWords(this.props.user);
  }

  render() {
    const {
      longestStreak,
      maxWords,
      totalWords,
      wordCount,
      writingDate,
    } = this.props;
    const wordsToday = wordCount[writingDate] || 0;
    const max = Math.max(maxWords, wordsToday);
    const total = totalWords + wordsToday;
    return (
      <section className="medals">
        <h1 className="medals__heading">
          Medals
          {/* <Link to="/medals/" className="medals__all-medals-link">View all medals</Link> */}
        </h1>
        <div className="medals__wrapper">
          <Medal title="Streak" type="streak"
            level={getLevelLongestStreak(longestStreak)} detail={`${longestStreak} day${longestStreak === 1 ? '' : 's'}`} />
          <Medal title="Max words" type="max-words"
            level={getLevelMaxWords(max)} detail={`${max} word${max === 1 ? '' : 's'}`} />
          <Medal title="Total words" type="total-words"
            level={getLevelTotalWords(total)} detail={`${total} word${total === 1 ? '' : 's'}`} />
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  user: state.session.user,
  wordCount: state.words.wordCount,
  longestStreak: state.words.longestStreak,
  maxWords: state.words.maxWords,
  totalWords: state.words.totalWords,
});

const mapDispatchToProps = dispatch => ({
  loadLongestStreak: user => dispatch(loadLongestStreak(user)),
  loadMaxWords: user => dispatch(loadMaxWords(user)),
  loadTotalWords: user => dispatch(loadTotalWords(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Medals);
