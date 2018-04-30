import React from 'react';
import withAuthorization from '../../withAuthorization';

import MedalList from '../../components/MedalList';

const AllMedals = () =>
  <article className="app grid app-content">
    <main className="app__main grid__col-sm-12">
      <MedalList />
    </main>
  </article>;

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AllMedals);
