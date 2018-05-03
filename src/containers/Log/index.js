import React from 'react';

import withAuthorization from '../../withAuthorization';

import LogWriting from '../../components/LogWriting';
import Tags from '../../components/Tags';
import LastSevenDays from '../../components/LastSevenDays';
import Calendar from '../../components/Calendar';
import Medals from '../../components/Medals';

// import SignOutButton from '../../components/SignOutButton';

import { makeDateString } from '../../constants/utils';

import './index.css';

const Log = ({ match }) => {
  const writingDate = match.params.writingDate || makeDateString(new Date());
  return (
    <article className="grid">
      <main className="app__main grid__col-sm-8">
        <LogWriting writingDate={writingDate} />
      </main>
      <aside className="app__sidebar grid__col-sm-4">
        <Tags writingDate={writingDate}/>
        <LastSevenDays />
        <Calendar />
        <Medals writingDate={writingDate} />
      </aside>
    </article>
  );
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Log);
