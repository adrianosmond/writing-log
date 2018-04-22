import React, { Component } from 'react';
import { connect } from 'react-redux';
import { countWords, makeDateString, makeDateText } from '../../constants/utils';

import {
  loadWords,
  setWords,
  saveWords,
  setWordCount,
  saveWordCount,
} from '../../actions/words';

import './index.css';

class LogWriting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numWords: 0,
      lastSavedAt: 0,
      words: '',
      dateText: makeDateText(props.writingDate),
      timeout: null,
    };

    props.loadWords(props.user, props.writingDate);
  }

  static defaultProps = {
    writingDate: makeDateString(new Date()),
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.saveProgress.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveProgress.bind(this));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.writingDate !== this.props.writingDate) {
      this.saveProgress();

      this.setState({
        loading: true,
        dateText: makeDateText(newProps.writingDate),
      });

      newProps.loadWords(newProps.user, newProps.writingDate);
    } else {
      const newWords = newProps.words[newProps.writingDate];
      const newWordCount = countWords(newWords);
      this.setState({
        numWords: newWordCount,
        lastSavedAt: newWordCount,
        words: newProps.words[newProps.writingDate],
      });
    }
  }

  handleChange(event) {
    clearTimeout(this.state.timeout);

    const prevNumWords = this.state.numWords;
    const numWords = countWords(event.target.value);
    const timeout = setTimeout(this.saveProgress.bind(this), 10000);

    this.setState({
      words: event.target.value,
      numWords,
      timeout,
    });

    if (numWords !== prevNumWords) {
      this.props.setWordCount(this.props.writingDate, numWords);
    }

    if (numWords % 10 === 0 && numWords !== this.state.lastSavedAt) {
      this.saveProgress();
    }
  }

  saveProgress() {
    const { user, writingDate } = this.props;
    this.props.saveWords(user, writingDate, this.state.words);
    this.props.saveWordCount(user, writingDate, this.state.numWords);
    this.setState({
      lastSavedAt: this.state.numWords,
    });
  }

  render() {
    return (
      <section className="log-writing">
        <h1 className="log-writing__heading">
          Writing: {this.state.dateText}
        </h1>
        <textarea
          className="log-writing__input"
          value={this.state.words}
          onChange={this.handleChange.bind(this)}
          disabled={this.state.loading}
          />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  words: state.words.words,
  loading: state.words.loading,
});

const mapDispatchToProps = dispatch => ({
  loadWords: (user, date) => dispatch(loadWords(user, date)),
  setWords: (date, words) => dispatch(setWords(date, words)),
  saveWords: (user, date, words) => dispatch(saveWords(user, date, words)),
  setWordCount: (date, numWords) => dispatch(setWordCount(date, numWords)),
  saveWordCount: (user, date, numWords) => dispatch(saveWordCount(user, date, numWords)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogWriting);
