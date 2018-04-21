import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { auth } from './lib/firebase';
import * as routes from './constants/routes';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        this.props.onSetAuthUser(authUser)
        if (!authCondition(authUser)) {
          this.props.history.push(routes.NOT_LOGGED_IN);
        }
      });
    }

    render() {
      return this.props.authUser ? <Component /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.session.authUser,
  });

  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
  });

  return compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
  )(WithAuthorization);
}

export default withAuthorization;
