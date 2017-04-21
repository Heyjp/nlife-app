import React from 'react'

import {Redirect} from 'react-router-dom'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (this.props.LoggedIn) {
      return (
        <Redirect to={{pathname: '/'}} />
      )
    }

    return (
      <div className="log-box">
          {
            this.props.route === "signup" ? (
              <Signup route={this.props.route} Login={this.props.Login}/>
            ) : (
              <Login route={this.props.route} Login={this.props.Login} />
            )
          }
      </div>
    )
  }
}


class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: "",
    password: "",
    route: this.props.route
  }

  handleUser (e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePass (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit () {
    let details = {
      username: this.state.username,
      password: this.state.password,
      route: this.state.route
    }
    this.props.Login(details);
  }

  render () {
    return (
      <form id="sign-up-form">
        <fieldset>
          <h4>Create Your Account</h4>
          <input type="text" placeholder="Username" onChange={this.handleUser}/><br/>
          <input type="password" placeholder="Password" onChange={this.handlePass}/><br/>
          <input className="action-button" type="button" value="Create Account" onClick={this.handleSubmit}/>
        </fieldset>
      </form>
    )
  }

}

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: "",
    password: "",
    route: this.props.route
  }

  handleUser (e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePass (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit () {

    let details = {
      username: this.state.username,
      password: this.state.password,
      route: this.props.route
    }
    this.props.Login(details);
  }

  render () {
    return (
      <form id="sign-up-form">
        <fieldset>
          <h4>Login</h4>
          <input type="text" placeholder="Username" onChange={this.handleUser}/><br/>
          <input type="password" placeholder="Password" onChange={this.handlePass}/><br/>
          <input className="action-button" type="button" value="Login" onClick={this.handleSubmit}/>
        </fieldset>
      </form>
    )
  }
}


export default LoginContainer
