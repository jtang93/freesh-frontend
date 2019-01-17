import React, { Component } from 'react'
import ReactMapboxGl, { Marker, Layer, Feature, Popup } from "react-mapbox-gl";
import { GeoJSONLayer } from "react-mapbox-gl";
// import { connect } from 'react-redux'

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_KEY
})

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.REACT_APP_KEY });

export default class Mapbox extends React.Component {

state = {
  listings: this.props.listings,
  currentListing: null,
  mapCenter: [-74.0060, 40.7128]
}

componentWillReceiveProps(nextProps) {
  let newListings = nextProps.listings
  // if (newListings.length != 0) {
    this.setState({listings: newListings})
    // debugger
    // console.log('coordinates:',this.cStringToGeocode(newListings[newListings.length-1]) )
    this.setState({mapCenter: this.cStringToGeocode(newListings[newListings.length-1])})
  // }
}

// componentDidMount() {
//   fetch('http://localhost:4000/api/v1/listings')
//   .then(r => r.json())
//   .then(parsed => {
//     this.setState({listings: parsed})
//     console.log('mapbox listings:', this.state.listings)
//   })
// }

cStringToGeocode = (listing) => {
  if (listing) {

    return(listing.coordinates.split(",").map(n => parseFloat(n)))
  }
}

makeFeatures = () => {
  let pins = this.state.listings.map(listing =>
    <Marker coordinates={this.cStringToGeocode(listing)} onClick={(e) => this.clickHandler(e, listing)}/>
  )
  console.log("pins",pins)
  return(pins)
}

clickHandler = (e, listing) => {
  console.log(e)
  console.log(listing)
  this.setState({currentListing: listing})
  console.log("current listing:", this.state.currentListing)

  // this.setState({mapCenter: this.cStringToGeocode(listing)})
}

makePopups = () => {
  if (this.state.currentListing) {
    let currentID = this.state.currentListing.id
    return(
      <Popup
      coordinates={this.cStringToGeocode(this.state.currentListing)}
      anchor="top"
      onClick = {() => this.closePopup()}
      >
        <p>Item: {this.state.currentListing.item}</p>
        <p>Condition: {this.state.currentListing.condition}</p>
        <p>Location: {this.state.currentListing.location}</p>
        <p><img className="popupImage" src={`https://res.cloudinary.com/dhoaj6ygx/image/upload/v1546474612/item${currentID}.jpg`}/></p>
      </Popup>)
    }
  }

closePopup = () => {
  this.setState({currentListing: null})
}

render() {
  console.log(this.props.listings)
  return (
    <div>
      <Map
      style="mapbox://styles/mapbox/streets-v9"
      center={this.state.mapCenter}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>

        <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "rocket-15" }}
        color="#01FEDC">

          {this.makeFeatures()}

        </Layer>
        {this.makePopups()}




      </Map>


    </div>
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
// export default connect(mapStateToProps, mapDispatchToProps)(Mapbox)
