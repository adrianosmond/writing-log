import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import * as routes from '../../constants/routes';

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
        this.props.history.push(routes.LOGGED_IN);
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h2>Sign In</h2>
        { this.state.error ? <p>{this.state.error}</p> : null }
        <div>
          <label htmlFor="login-email">Email address:</label>
          <input id="login-email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} type="email" />
        </div>
        <div>
          <label htmlFor="login-password1">Password:</label>
          <input id="login-password1" value={this.state.password} onChange={event => this.setState({ password: event.target.value })} type="password" />
        </div>
        <button type="submit">Sign in</button>
        <p><Link to={routes.PASSWORD_RESET}>Forgot your password?</Link></p>
      </form>
    );
  }
}

export default withRouter(LoginForm);
