import React from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';

const NotLoggedIn = () =>
  <div>
    <div className="grid">
      <div className="grid__col-sm-12">
        <p>Welcome. You are not logged in</p>
      </div>
    </div>
    <div className="grid">
      <div className="grid__col-sm-6">
        <LoginForm />
      </div>
      <div className="grid__col-sm-6">
        <RegisterForm />
      </div>
    </div>
  </div>;

export default NotLoggedIn;
