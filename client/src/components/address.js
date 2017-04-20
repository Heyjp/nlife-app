import React from 'react';

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

export default Address 
