import React from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

import Menu from './menu.js'
import Main from './main.js'

class App extends React.Component {

  state = {
    query: "",
    isLoggedIn: false
  }

  handleLogin (e) {
    axios.post('/login', {
      username: e.username,
      password: e.password
    }).then(function (res ) {
      console.log(res);
    })
  }

  render () {
    return (
      <Router>
        <div className="main-container">
          <Menu  />
          <Main login={this.handleLogin} />
        </div>
      </Router>
    )
  }
}


export default App;
