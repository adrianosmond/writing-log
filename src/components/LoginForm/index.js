import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import * as routes from '../../constants/routes';

import '../../css/form.css';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit(event) {
    event.preventDefault();

    if (!this.state.email === '') {
      this.setState({
        error: 'Please enter your email address',
      });
      return;
    }

    if (this.state.password === '') {
      this.setState({
        error: 'Please enter your password',
      });
      return;
    }

    // VALIDATED
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.props.history.push(routes.WRITING);
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} className="form">
        <h2 className="form__heading">Sign In</h2>
        { this.state.error ? <p className="form__error">{this.state.error}</p> : null }
        <div className="form__row">
          <label className="form__label" htmlFor="login-email">Email address:</label>
          <input className="form__input" id="login-email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} type="email" />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="login-password1">Password:</label>
          <input className="form__input" id="login-password1" value={this.state.password} onChange={event => this.setState({ password: event.target.value })} type="password" />
        </div>
        <button className="form__button" type="submit">Sign in</button>
        <p className="form__link"><Link to={routes.PASSWORD_RESET}>Forgot your password?</Link></p>
        <p className="form__link"><Link to={routes.REGISTER}>Create an account</Link></p>
      </form>
    );
  }
}

export default withRouter(LoginForm);
