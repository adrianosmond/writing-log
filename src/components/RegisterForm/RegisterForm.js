import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import * as routes from '../../constants/routes';
import { isValidEmail } from '../../constants/utils';

import '../../css/form.css';

const INITIAL_STATE = {
  email: '',
  password1: '',
  password2: '',
  error: null,
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit(event) {
    event.preventDefault();

    if (!isValidEmail(this.state.email)) {
      this.setState({
        error: 'Please enter a valid email address',
      });
      return;
    }

    if (this.state.password1 !== this.state.password2) {
      this.setState({
        error: 'Your passwords don\'t match',
      });
      return;
    }

    if (this.state.password1 === '') {
      this.setState({
        error: 'Please enter a password',
      });
      return;
    }

    // VALIDATED
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password1)
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
        <h2 className="form__heading">Sign up</h2>
        { this.state.error ? <p className="form__error">{this.state.error}</p> : null }
        <div className="form__row">
          <label className="form__label" htmlFor="register-email">Email address:</label>
          <input className="form__input" id="register-email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} type="email" />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="register-password1">Password:</label>
          <input className="form__input" id="register-password1" value={this.state.password1} onChange={event => this.setState({ password1: event.target.value })} type="password" />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="register-password2">Confirm Password:</label>
          <input className="form__input" id="register-password2" value={this.state.password2} onChange={event => this.setState({ password2: event.target.value })} type="password" />
        </div>
        <button className="form__button" type="submit">Sign up</button>
      </form>
    );
  }
}

export default withRouter(RegisterForm);
