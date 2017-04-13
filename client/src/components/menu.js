import React from 'react'
import {Link} from 'react-router-dom'

class MenuContainer extends React.Component {
  render () {
    return (
    <div className="menu-container">
      <div className="menu">
        <ul>
          <li className="btn"><Link to="/login">Login</Link></li>
          <li className="btn"><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </div>
    )
  }
}

export default MenuContainer
