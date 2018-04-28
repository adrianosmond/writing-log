import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import * as routes from './constants/routes';

import NotLoggedIn from './containers/NotLoggedIn';
import Log from './containers/Log';
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
          <Route path={`${routes.LOGGED_IN}/:writingDate?`} component={Log} />
          <Route path={routes.PASSWORD_RESET} component={PasswordReset} />
          <Route path={routes.REGISTER} component={Register} />
        </Switch>
      </Router>
    </article>
  </div>;

export default App;
