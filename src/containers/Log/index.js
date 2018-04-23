import React from 'react';
import withAuthorization from '../../withAuthorization';

import LogWriting from '../../components/LogWriting';
import LastSevenDays from '../../components/LastSevenDays';
import Calendar from '../../components/Calendar';

// import SignOutButton from '../../components/SignOutButton';

const Log = ({ match }) => {
  const { writingDate } = match.params;
  return (
    <article className="grid app-content">
      <main className="grid__col-sm-8">
        <LogWriting writingDate={writingDate} />
      </main>
      <aside className="grid__col-sm-4">
        {/* <Tags writingDate={this.props.routeParams.writingDate}/> */}
        <LastSevenDays />
        <Calendar />
        {/* <Medals /> */}
      </aside>
    </article>
  );
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Log);
