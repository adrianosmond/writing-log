import React from 'react';
import PropTypes from 'prop-types';
import { auth } from './lib/firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    getChildContext() {
      return {
        authUser: this.state.authUser
      };
    }

    render() {
      return (
        <Component />
      );
    }
  }
  
  WithAuthentication.childContextTypes = {
    authUser: PropTypes.object,
  };

  return WithAuthentication;
}

export default withAuthentication;
