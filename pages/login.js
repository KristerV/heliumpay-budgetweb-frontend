import React from 'react'
import Link from 'next/link'
import config from '../config'
import moment from 'moment'
import Bitcore from 'bitcore-lib-dash'
import NoScript from 'react-noscript'

import LayoutColumns from '../components/LayoutColumns'
import Paper from '../components/Paper'

const views = {
  login: 'login',
  register: 'register',
  sendPasswordReset: 'sendPasswordReset'
}

export default class extends React.Component {
  state = {
    view: 'login',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  }

  setFormValue = prop => e => {
    this.setState({ [prop]: e.target.value });
  }

  setView = view => e => {
    e.preventDefault();
    this.setState({ view })
  }

  register = e => {
    e.preventDefault();
    const { username, password, confirmPassword, email } = this.state

    console.log('regiser', { username, password, confirmPassword, email })
  }

  login = e => {
    e.preventDefault();
    const { username, password } = this.state

    console.log('login', { username, password })
  }

  sendPasswordReset = e => {
    e.preventDefault();
    const { username } = this.state

    console.log('sendPasswordReset', { username })
  }

  renderLoginForm() {
    const { username, password } = this.state;

    return (
      <div className="item">
        <h1>Login</h1>
        <Paper>
          <form onSubmit={this.login}>
            <table>
              <tbody>
                <tr>
                  <td><label>Username</label></td>
                  <td><input value={username} onChange={this.setFormValue('username')} /></td>
                  <td></td>
                </tr>
                <tr>
                  <td><label>Password</label></td>
                  <td><input type="password" value={password} onChange={this.setFormValue('password')} /></td>
                  <td>
                    <small>
                      <a href="#" onClick={this.setView(views.sendPasswordReset)}>Forgot?</a>
                    </small>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <button type="submit">Login</button>
            <br />
          </form>
          <br />
          <small>
            Don&apos;t have an account?&nbsp;
            <a href="#" onClick={this.setView(views.register)}>Register</a>
          </small>
        </Paper>
      </div>
    )
  }

  renderRegisterForm() {
    const { username, password, confirmPassword, email } = this.state

    return (
      <div className="item">
        <h1>Create an account</h1>
        <Paper>
          <form onSubmit={this.register}>
            <table>
              <tbody>
                <tr>
                  <td><label>Username</label></td>
                  <td><input value={username} onChange={this.setFormValue('username')} /></td>
                  <td><i>(min 3 characters, only letters, numbers and underscores, starts with a letter)</i></td>
                </tr>
                <tr>
                  <td><label>Password</label></td>
                  <td><input type="password" value={password} onChange={this.setFormValue('password')} /></td>
                  <td><i>(min 12 characters)</i></td>
                </tr>
                <tr>
                  <td><label>Confirm password</label></td>
                  <td><input type="password" value={confirmPassword} onChange={this.setFormValue('confirmPassword')} /></td>
                </tr>
                <tr>
                  <td><label>Email</label></td>
                  <td><input type="email" value={email} onChange={this.setFormValue('email')} /></td>
                  <td><i>(optional)</i></td>
                </tr>
              </tbody>
            </table>
            <br />
            <button type="submit">Register</button>
            <br />
          </form>
          <br />
          <small>
            Already have an account?&nbsp;
            <a href="#" onClick={this.setView('login')}>Login</a>
          </small>
        </Paper>
      </div>
    )
  }

  renderSendPasswordResetForm() {
    const { username } = this.state

    return (
      <div className="item">
        <h1>Login</h1>
        <Paper>
          <form onSubmit={this.sendPasswordReset}>
            <table>
              <tbody>
                <tr>
                  <td><label>Username</label></td>
                  <td><input value={username} onChange={this.setFormValue('username')} /></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <br />
            <button type="submit">Send Link</button>
            <button onClick={this.setView(views.login)}>Cancel</button>
          </form>
        </Paper>
      </div>
    )
  }

  render() {
    const { view } = this.state

    let viewEl
    if (view === views.login) {
      viewEl = this.renderLoginForm()
    } else if (view === views.register) {
      viewEl = this.renderRegisterForm()
    } else if (view === views.sendPasswordReset) {
      viewEl = this.renderSendPasswordResetForm()
    }

    return (
      <LayoutColumns>
        {viewEl}
      </LayoutColumns>
    )
  }
}