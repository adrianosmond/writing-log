import React from 'react';
import LoginForm from '../../components/LoginForm';

const NotLoggedIn = () =>
  <div>
    <div className="grid">
    </div>
    <div className="grid">
      <div className="grid__col-sm-3 grid__col-md-4" />
      <div className="grid__col-sm-6 grid__col-md-4">
        <LoginForm />
      </div>
    </div>
  </div>;

export default NotLoggedIn;
