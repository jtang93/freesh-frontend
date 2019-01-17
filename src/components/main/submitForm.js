import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { connect } from 'react-redux'
// import { updateListings } from '.../App.js'

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.REACT_APP_KEY });

export default class SubmitForm extends React.Component {

  state = {
    item: null,
    condition: null,
    location: null,
    coordinates: null,
    picture: null,
  }

  getGeoCode = (location) => {geocodingClient.forwardGeocode({
      query: `${location}`,
      limit: 1
    })
  .send()
  .then(response => {
    let match = null
    if (response.body.features[0]) {
      match = response.body.features[0].center
      console.log(match)
      this.setState({coordinates: match.toString()})
    }
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
    if (this.state.coordinates && this.state.item) {
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
            coordinates: this.state.coordinates
          }
        })
      })
      .then(r => r.json())
      .then(response => {
        console.log(response)
        let item = response
        let uploadurl = 'https://api.cloudinary.com/v1_1/dhoaj6ygx/image/upload'
        let uploadpreset = 'epdquaqb'
        let formdata = new FormData()
        formdata.append('file', this.state.picture)
        formdata.append('upload_preset', uploadpreset)
        formdata.append("public_id", `item${item.id}`)
        let xhr = new XMLHttpRequest()
        xhr.open("POST", uploadurl, true)
        xhr.send(formdata)
        this.props.updateListings(item)
      })
    }
    else {
      console.log("enter a proper location and name")
    }
  }

  selectFile = (e) => {
    this.setState({picture: e.target.files[0]})
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
          Pictures:
          <input type="file" name="picture" onChange={this.selectFile}/>
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    )
  }

}

// function mapStateToProps(state) {
//   return{
//     listings: state.listings
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return{
//     updateListings: dispatch
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(SubmitForm)
