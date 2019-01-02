import React, { Component } from 'react';

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.REACT_APP_KEY });

class SubmitForm extends React.Component {

  state = {
    item: null,
    condition: null,
    location: null,
    coordinates: null,
    picture: null
  }

  getGeoCode = (location) => {geocodingClient.forwardGeocode({
      query: `${location}`,
      limit: 1
    })
  .send()
  .then(response => {
    const match = response.body.features[0].center
    console.log(match)
    this.setState({coordinates: match.toString()})
  })
  }

  changeHandler = (e) => {
    // this.setState({ [semanticInputData.name]: semanticInputData.value })
    this.setState({ [e.target.name]: e.target.value })
    if (!!this.state.location) {
      this.getGeoCode(this.state.location)
    }
  }

  submitHandler = (e) => {
    e.preventDefault()
    fetch('http://localhost:4000/api/v1/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        listing: {
          user_id: 1,
          item: this.state.item,
          condition: this.state.condition,
          location: this.state.location,
          coordinates: this.state.coordinates,
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Guy_Fieri_at_Guantanamo_2.jpg'
        }
      })
    })
    .then(r => r.json())
    .then(console.log)
    }

  render () {

    return (
      <form onSubmit = {(e) => this.submitHandler(e)}>
        <label>
          Item:
          <input type="text" name="item" onChange={this.changeHandler}/>
        </label>
        <br/>
        <label>
          Condition:
          <input type="text" name="condition" onChange={this.changeHandler}/>
        </label>
        <br/>
        <label>
          Location:
          <input type="text" name="location" onChange={this.changeHandler}/>
        </label>
        <br/>
        <label>
          Picture:
          <input type="text" name="picture" onChange={this.changeHandler}/>
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    )
  }



}
export default SubmitForm
