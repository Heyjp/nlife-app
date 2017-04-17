import React from 'react'
import {Link} from 'react-router-dom'

class MenuContainer extends React.Component {

  handleClick (e) {
    e.preventDefault();

    axios.post('/logout').then(function (res) {
      console.log(res, "logout res");
    });
  }


  render () {
    return (
    <div className="menu-container">
      <div className="menu">
        <ul>
          <li className="btn"><Link to="/login">Login</Link></li>
          <li className="btn"><a href='#' onClick={this.handleClick}>Logout</a></li>
        </ul>
      </div>
    </div>
    )
  }
}

export default MenuContainer
