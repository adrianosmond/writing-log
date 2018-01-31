import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { isValidEmail } from '../../constants/utils'
import { auth } from '../../lib/firebase'
import * as routes from '../../constants/routes'

const INITIAL_STATE = {
  email: '',
  sent: false,
  error: null
}

class PasswordReset extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit(event) {
    event.preventDefault()

    if (!isValidEmail(this.state.email)) {
      this.setState({
        error: 'Please enter a valid email address'
      })
      return
    }

    auth.sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({
          ...INITIAL_STATE,
          sent: true
         });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });

  }

  render () {
    return (
      <div className="grid">
        <div className="grid__col--sm-12">
          { this.state.sent ?
            <div>
              <p>A password reset email has been sent. Please check your inbox</p>
              <Link to={routes.NOT_LOGGED_IN}>Back to the login page</Link>
            </div>
          :
            <form onSubmit={this.onSubmit.bind(this)}>
              <p>Please enter the email address you used to sign up</p>
              { this.state.error ? <p>{this.state.error}</p> : null }
              <div>
                <label htmlFor="password-reset-email">Email:</label>
                <input value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} type="email" />
              </div>
              <button type="submit">Reset password</button>
            </form>
          }
        </div>
      </div>
    )
  }
}

export default PasswordReset
