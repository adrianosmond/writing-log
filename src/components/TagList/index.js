import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadAllTags } from '../../actions/tags';

import { makeDateString, makeDateText } from '../../constants/utils';
import * as routes from '../../constants/routes';

import './index.css';

class AllTags extends Component {
  constructor(props) {
    super(props);
    props.loadTags(props.user);
  }

  render() {
    if (!this.props.tags) {
      return null;
    }
    const today = makeDateString(new Date());
    return (
      <section className="tag-list">
        <h1 className="tag-list__heading">Tags</h1>
        {Object.keys(this.props.tags).map((tag) => {
          if (this.props.tagName && tag !== this.props.tagName) {
            return null;
          }
          return (
            <div key={tag} className="tag-list__tag">
              <h2 className="tag-list__tag-heading">{tag}</h2>
              <ul className="tag-list__list">
                {Object.keys(this.props.tags[tag]).map(val => (
                  <li key={val} className="tag-list__list-item">
                    <Link to={`${routes.WRITING}${val === today ? '' : `/${val}`}`}
                        className="tag-list__tag-link">{makeDateText(val)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        { this.props.tagName &&
          <Link to={routes.TAGS} className="tag-list__all-tags-link">View all tags</Link> }
      </section>
    );
  }
}


const mapStateToProps = state => ({
  user: state.session.user,
  tags: state.tags.tags,
});

const mapDispatchToProps = dispatch => ({
  loadTags: user => dispatch(loadAllTags(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTags);
