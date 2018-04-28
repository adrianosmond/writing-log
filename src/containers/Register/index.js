import React from 'react';
import RegisterForm from '../../components/RegisterForm';

const Register = () =>
  <div>
    <div className="grid">
    </div>
    <div className="grid">
      <div className="grid__col-sm-3 grid__col-md-4" />
      <div className="grid__col-sm-6 grid__col-md-4">
        <RegisterForm />
      </div>
    </div>
  </div>;

export default Register;
