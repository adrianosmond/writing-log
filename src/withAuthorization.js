import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { auth } from './lib/firebase';
import * as routes from './constants/routes';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.NOT_LOGGED_IN);
        }
      });
    }

    render() {
      return this.context.authUser ? <Component /> : null;
    }
  }

  WithAuthorization.contextTypes = {
    authUser: PropTypes.object,
  };

  return withRouter(WithAuthorization);
}

export default withAuthorization;
