import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadTagsForDate, addTag, removeTag } from '../../actions/tags';
import * as routes from '../../constants/routes';

import './Tags.css';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };

    props.loadTags(props.user, props.writingDate);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.writingDate !== this.props.writingDate) {
      this.props.loadTags(newProps.user, newProps.writingDate);
    }

    if (newProps.tagDates[newProps.writingDate]) {
      this.setState({
        tags: newProps.tagDates[newProps.writingDate],
      });
    }
  }

  removeTag(tag, event) {
    event.preventDefault();
    this.props.removeTag(this.props.user, this.props.writingDate, tag);
  }

  handleInput(event) {
    if (event.keyCode === 13) {
      const input = event.target;
      const newTag = input.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_');
      if (this.state.tags.indexOf(newTag) < 0) {
        this.props.addTag(this.props.user, this.props.writingDate, newTag);
      }
      input.value = '';
    }
  }

  render() {
    return (
      <section className="tags">
        <h1 className="tags__heading">
          Tags
          <Link to={routes.TAGS} className="tags__all-tags-link">View all tags</Link>
        </h1>
        <input className="tags__input" placeholder="Add a tag" onKeyDown={this.handleInput.bind(this)} />
        <div className="tags__list">
          {this.state.tags.map((tag, idx) => (
            <Link to={`${routes.TAGS}/${tag}`} className="tags__tag" key={idx}>
              {tag}
              <button className="tags__remove-tag-button"
                onClick={this.removeTag.bind(this, tag)}>&times;</button>
            </Link>
          ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  tagDates: state.tags.tagDates,
});

const mapDispatchToProps = dispatch => ({
  loadTags: (user, date) => dispatch(loadTagsForDate(user, date)),
  addTag: (user, date, tag) => dispatch(addTag(user, date, tag)),
  removeTag: (user, date, tag) => dispatch(removeTag(user, date, tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
