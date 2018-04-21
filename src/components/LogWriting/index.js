import React, { Component } from 'react';

import { countWords, makeDateString, makeDateText } from '../../constants/utils';

import './index.css';

class LogWriting extends Component {
  constructor(props) {
    super(props);

    this.state = {
			username: '',
			numWords: 0,
			lastSavedAt: 0,
			words: '',
			dateText: makeDateText(props.writingDate),
			loading: true,
			timeout: null
		};
  }

  static defaultProps = {
    writingDate: makeDateString(new Date())
  }

  handleChange(event) {
    clearTimeout(this.state.timeout);

		const prevNumWords = this.state.numWords;
		const numWords = countWords(event.target.value);
		const timeout = setTimeout(this.saveProgress, 10000);
		
		this.setState({
			words: event.target.value,
			numWords,
			timeout
		});

		if (numWords !== prevNumWords) {
      //TODO - update number of words for writingDate
		}

		if (numWords % 10 === 0 && numWords !== this.state.lastSavedAt) {
			this.saveProgress();
		}
  }

  saveProgress() {

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
					onChange={this.handleChange}
					disabled={this.state.loading}
				/>
			</section>
		);
  }
}

export default LogWriting;