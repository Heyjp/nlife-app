var React = require('react');
var ReactDOM = require('react-dom');
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

import Menu from './components/menu.js'
import Main from './components/main.js'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className="main-container">
          <Menu />
          <Main />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
