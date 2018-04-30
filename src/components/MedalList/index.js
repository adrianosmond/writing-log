import React, { Component } from 'react';
import { connect } from 'react-redux';

import Medal from '../Medal';

import { loadLongestStreak, loadMaxWords, loadTotalWords } from '../../actions/words';
import { levelTypes, longestStreakLevels, totalWordLevels, maxWordLevels } from '../../constants/constants';

import './index.css';

class MedalList extends Component {
  constructor(props) {
    super(props);

    longestStreakLevels.pop();
    maxWordLevels.pop();
    totalWordLevels.pop();

    this.state = {
      medals: {
        longestStreak: {
          title: 'Longest streak',
          values: longestStreakLevels,
          unit: 'day',
        },
        maxWords: {
          title: 'Max words',
          values: maxWordLevels,
          unit: 'word',
        },
        totalWords: {
          title: 'Total words',
          values: totalWordLevels,
          unit: 'word',
        },
      },
    };

    props.loadLongestStreak(props.user);
    props.loadMaxWords(props.user);
    props.loadTotalWords(props.user);
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }

  render() {
    return (
      <section className="medal-list">
        <h1 className="medal-list__heading">Medals</h1>
        {Object.keys(this.state.medals).map((key) => {
          const medal = this.state.medals[key];
          return (
            <div key={key}>
              <h2 className="medal-list__subheading">{medal.title}</h2>
              <div className="medal-list__medals-wrapper">
                {medal.values.map((score, index) => {
                  if (this.props[key] >= score) {
                    return <Medal key={score} type={key}
                              title={levelTypes[index]}
                              level={index + 1}
                              detail={`${score} ${medal.unit}${medal.unit === 1 ? '' : 's'}`} />;
                  }
                  return <Medal key={score} type={key}
                          title="&nbsp;"
                          level={0}
                          detail="&nbsp;" />;
                })}
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}


const mapStateToProps = state => ({
  user: state.session.user,
  longestStreak: state.words.longestStreak,
  maxWords: state.words.maxWords,
  totalWords: state.words.totalWords,
});

const mapDispatchToProps = dispatch => ({
  loadLongestStreak: user => dispatch(loadLongestStreak(user)),
  loadMaxWords: user => dispatch(loadMaxWords(user)),
  loadTotalWords: user => dispatch(loadTotalWords(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MedalList);
