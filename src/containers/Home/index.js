import React, { Component } from 'react';
import withAuthorization from '../../withAuthorization';

import LogWriting from '../../components/LogWriting';

// import SignOutButton from '../../components/SignOutButton';

class Home extends Component {
  render () {
    return (
      <article className="grid app-content">
				<main className="grid__col-sm-8">
					<LogWriting />
				</main>
				<aside className="grid__col-sm-4">
					{/* <Tags writingDate={this.props.routeParams.writingDate}/>
					<LastSevenDays />
					<WritingCalendar />
					<Medals /> */}
				</aside>
			</article>
    )
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Home);
