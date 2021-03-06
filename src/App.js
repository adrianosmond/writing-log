import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import * as routes from './constants/routes';

import NotLoggedIn from './containers/NotLoggedIn';
import Log from './containers/Log';
import AllTags from './containers/AllTags';
import AllMedals from './containers/AllMedals';
import PasswordReset from './containers/PasswordReset';
import Register from './containers/Register';
import Nav from './components/Nav';

const App = () =>
  <div>
    <Nav />
    <article className="app-content">
      <Router>
        <Switch>
          <Route exact path={routes.NOT_LOGGED_IN} component={NotLoggedIn} />
          <Route path={`${routes.WRITING}/:writingDate?`} component={Log} />
          <Route path={`${routes.TAGS}/:tagName?`} component={AllTags} />
          <Route path={routes.MEDALS} component={AllMedals} />
          <Route path={routes.PASSWORD_RESET} component={PasswordReset} />
          <Route path={routes.REGISTER} component={Register} />
        </Switch>
      </Router>
    </article>
  </div>;

export default App;
