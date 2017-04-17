import React from 'react'

import {Redirect} from 'react-router-dom'
/*

export const Login = () => (
  <div>
    <h1>Login</h1>
    <input type="text" placeholder="username" name="username" />
    <input type="password" placeholder="password" name="password" />
    <a href="#" className="btn">Submit</a>
  </div>
)
*/

export const Logout = () => (
  <div>
    <h1>Logout</h1>
  </div>
)

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    username: "",
    password: ""
  }

  handleUser (e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePass (e) {
    console.log(e.target.value, "this is e")
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit () {
    let details = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.login(details);
  }

  render () {
    if (this.props.LoggedIn) {
      return (
        <Redirect to={{pathname: '/'}} />
      )
    }


    return (
      <div className="log-box">
        <div className="menu">
          <ul>
            <li>Login</li>
            <li>Signup</li>
          </ul>
        </div>
        <div className="form-wrapper">
          <div className="form-header">
            <span>Enter your email and password <strong>to sign in</strong></span>
          </div>
          <form>
            <div className="login">
              <label />
              <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.handleUser}/>
            </div>
            <div className="login">
              <label />
              <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handlePass} />
            </div>
            <div>
                <a className="btn" href="#" onClick={this.handleSubmit}>Log in</a>
                <span>Forgot Your password</span>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
