import React from 'react';
import {Route, Link} from 'react-router-dom'

import {Login, Logout} from  './login.js'
import Title from './title.js'

class DataContainer extends React.Component {
  render () {
    return (
      <div className="data-container">
        <Title />
        <Route exact path="/" render={() => (
          <div className="search-wrapper">
            <SearchForm />
            <ListContainer />
          </div>
        )} />

        <Route path="/login" login={this.props.login} render={(props) => (
          <Login login={this.props.login} {...props} />
        )} />
        <Route path="/logout" component={Logout} />
      </div>
    )
  }
}

class SearchForm extends React.Component {

  render () {
    return (
      <div className="form">
        <input type="text" name="" value="" placeholder="Enter a city name" />
        <button>Submit</button>
      </div>
    )
  }
}


class ListContainer extends React.Component {

  render () {
    if (this.props.location) {
      let locations  = this.props.locations.map( (e) => {
          return([
            <Address data={e[0]}/>,
            <Attendance data={e[1]} />,
            <hr/>
          ])
      } )
    }


    return (
      <div className="list-container">

        <div className="location-display">
          <p>Results for </p>
        </div>

        <div className="location-container">
          <h1>Container</h1>
        </div>

        <hr />

      </div>
    )
  }

}

class Address extends React.Component {

  render () {
    return (
      <div className="address">
        <ul>
          <li><h1>The Railyway</h1></li>
          <li>25 Colbrook Close, Haywards Heath, West Sussex, RH7 9Y2</li>
          <li>Steak House</li>
          <li>2.5*</li>
        </ul>
      </div>
    )
  }
}

class Attendance extends React.Component {
  render () {
    return (
      <div className="attendance">
        <h6>Attending</h6>
        <a className="loc-btn">4</a>
      </div>
    )
  }
}

export default DataContainer
