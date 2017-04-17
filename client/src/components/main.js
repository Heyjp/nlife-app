import React from 'react';
import {Route, Link, Redirect} from 'react-router-dom'

import {Login, Logout} from  './login.js'
import Title from './title.js'

class DataContainer extends React.Component {
  constructor(props) {
    super(props)

    this.queryServer = this.queryServer.bind(this);
  }


  state = {
    query: "",
    locations: []
  }

  queryServer (location) {
    let self = this;

    axios.post('/search', {
      city: location
    }).then(function (res) {
      console.log(res, "queryServer response")
      self.setState({
        locations: []
      }, function () {
        self.setState({
          locations: res.data.businesses
        })
      })
    })
  }


  render () {
    return (
      <div className="data-container">
        <Title />
        <Route exact path="/" render={() => (
          <div className="search-wrapper">
            <SearchForm search={this.queryServer} />
            <ListContainer LoggedIn={this.props.LoggedIn} locations={this.state.locations} />
          </div>
        )} />
        <Route path="/login" login={this.props.login} render={(props) => (
              <Login login={this.props.login} LoggedIn={this.props.LoggedIn} {...props} />
          )} />
        <Route path="/logout" component={Logout} />
      </div>
    )
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  state = {
    location: ""
  }

  handleChange (e) {
    console.log("handling change", e.target.value)
    this.setState({
      location: e.target.value
    })
  }

  handleSubmit () {
    console.log("handling submit")
    console.log("this.props.search in handleSubmit", this.props.search)
    this.props.search(this.state.location)
  }

  render () {
    return (
      <div className="form">
        <input type="text" name="" value={this.state.location} placeholder="Enter a city" onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}


class ListContainer extends React.Component {

  render () {
    let locations;

    if (this.props.locations.length > 0) {
         locations  = this.props.locations.map( (e,i) => {
          return([
          <div>
            <div className="location">
              <Address data={e} key={i}/>
              <Attendance isLoggedIn={this.props.LoggedIn} data={e} key={100 + i} />
            </div>
            <hr/>
          </div>
          ])
      } )
    }


    return (
      <div className="list-container">

        <div className="location-display">
          <p>Results for </p>
        </div>

        <div className="location-container">
          {locations || <h1>Enter a Location</h1>}
        </div>

        <hr />

      </div>
    )
  }

}

class Address extends React.Component {

  state = {
    name: this.props.data.name,
    address: [this.props.data.location.address[0], this.props.data.location.city],
    type: this.props.data.categories.map((ele) => ele[0] + ", "),
    rating: this.props.data.rating
  }


  render () {
    return (
      <div className="address">
        <ul>
          <li><h1>{this.state.name}</h1></li>
          <li>{this.state.address}</li>
          <li>{this.state.type}</li>
          <li>{this.state.rating}*</li>
        </ul>
      </div>
    )
  }
}

class Attendance extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    attendance: this.props.data.guestListLength,
    id: this.props.data.id,
    city: this.props.data.location.city,
    isLoggedIn: false
  }

  reqAttend (e) {
    let self = this;
    axios.post('/check', {
      id: e.id,
      city: e.city
    }).then(function (res) {
      self.setState({
        attendance: res.data.guestList
      })
    })
  }

  handleClick () {
    console.log("handleClick")

    let data = {
      id: this.state.id,
      city: this.state.city
    };
    this.reqAttend(data);
  }

  render () {
    return (
      <div className="attendance">
        <h6>Attending</h6>
        <a className="loc-btn" href="#" onClick={this.handleClick}>{this.state.attendance}</a>
      </div>
    )
  }
}

export default DataContainer
