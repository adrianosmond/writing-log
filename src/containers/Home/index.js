import React, { Component } from 'react';
import withAuthorization from '../../withAuthorization';

import SignOutButton from '../../components/SignOutButton'

class Home extends Component {
  render () {
    return (
      <div>
        <p>Welcome. You <strong>are</strong> logged in</p>
        <SignOutButton />
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Home);
