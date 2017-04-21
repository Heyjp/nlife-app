import React from 'react';

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
    this.setState({
      location: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.search(this.state.location)
  }

  render () {

    return (
      <div className="form" >
        <form id="search" onSubmit={this.handleSubmit}>
          <input type="text" name="" value={this.state.location} placeholder="Enter a city" onChange={this.handleChange}/>
          <input className="hidden" type="submit"  />
        </form>
      </div>
    )
  }
}

export default SearchForm
