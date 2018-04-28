import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { auth } from './lib/firebase';
import * as routes from './constants/routes';

const withAuthorization = authCondition => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged((user) => {
        if (!authCondition(user)) {
          this.props.history.push(routes.NOT_LOGGED_IN);
        } else {
          this.props.onSetUser(user.uid);
        }
      });
    }

    render() {
      return this.props.user ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = state => ({
    user: state.session.user,
  });

  const mapDispatchToProps = dispatch => ({
    onSetUser: user => dispatch({ type: 'AUTH_USER_SET', user }),
  });

  return compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
  )(WithAuthorization);
};

export default withAuthorization;
