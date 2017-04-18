import React from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'

import Menu from './menu.js'
import Main from './main.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this);
  }

  state = {
    query: "",
    isLoggedIn: false,
    user: ""
  }

  componentWillMount () {
    this.sessionCheck();
    this.queryCheck();
  }

  sessionCheck () {
    let self = this;
    axios.post('/user')
      .then(function (res) {
        if (res.data.user !== false) {
          self.setState({
            isLoggedIn: true,
            user: res.data.user
          });
        }
      });
  }

  queryCheck () {
    let self = this;
    axios.post('/query')
      .then(function (res) {
        console.log("this is queryCheck res", res);
        self.setState({
          query: res.data.location
        })
      })
  }

  handleLogin (e) {
    let self = this;
    axios.post('/login', {
      username: e.username,
      password: e.password
    }).then(function (res) {
      console.log("returning");
      self.setState({
        isLoggedIn: true
      })
    })
  }

  render () {

    return (
      <Router>
        <div className="main-container">
          <Menu  />
          <Main query={this.state.query} LoggedIn={this.state.isLoggedIn} login={this.handleLogin} />
        </div>
      </Router>
    )
  }
}


export default App;
