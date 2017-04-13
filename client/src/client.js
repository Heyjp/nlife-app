var React = require('react');
var ReactDOM = require('react-dom');

class App extends React.Component {
  render () {
    return (
        <div className="main-container">
          <MenuContainer />
          <DataContainer />
        </div>
    )
  }
}


class MenuContainer extends React.Component {
  render () {
    return (
    <div className="menu-container">
      <div className="menu">
        <ul>
          <li className="btn">Login</li>
          <li className="btn">logout</li>
        </ul>
      </div>
    </div>
    )
  }
}


class DataContainer extends React.Component {


  render () {
    return (
      <div className="data-container">
        <Title />
        <SearchForm />
        <ListContainer />
      </div>
    )
  }
}

class Title extends React.Component {

  render () {
    return (
      <div className="title">
        <h2>N-life</h2>
        <h4>An FCC Nightlife Coordination App</h4>
        <p>Built by Me.</p>
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

    let locations  = this.props.locations.map( (e) => {
        return([
          <Address data={e[0]}/>,
          <Attendance data={e[1]} />,
          <hr/>
        ])
    } )

    return (
      <div className="list-container">

        <div className="location-display">
          <p>Results for {this.props.location}</p>
        </div>

        <div className="location-container">
          {locations}
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
