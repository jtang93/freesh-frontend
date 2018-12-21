import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { GeoJSONLayer } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_KEY
})

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.REACT_APP_KEY });

class Mapbox extends React.Component {

state = {
  locations: [],
  geojson: null
}

componentDidMount() {
  fetch('http://localhost:4000/api/v1/listings')
  .then(r => r.json())
  .then(parsed => {
    this.setState({geojson: parsed})
    console.log(this.state.geojson)

    this.state.geojson.map(listing => {
      geocodingClient
      .forwardGeocode({
        query: `${listing.location}`,
        limit: 1
      })
      .send()
      .then(response => {
        const match = response.body.features[0].center;
        let locations = this.state.locations
        this.setState({locations: [...locations, match]})
        console.log(locations)
      });
    })
  })
}

makeFeatures = () => {
  console.log("locations", this.state.locations)
  let pins = this.state.locations.map(coordinate =>
      <Feature coordinates={coordinate}/>)
  console.log("pins",pins)
  return(pins)
}

render() {
  return (
    <div>
    <Map
    style="mapbox://styles/mapbox/streets-v9"
    center={[-74.0060, 40.7128]}
    containerStyle={{
      height: "100vh",
      width: "100vw"
    }}>
    <Layer
    type="symbol"
    id="marker"
    layout={{ "icon-image": "rocket-15" }}>
    {this.makeFeatures()}
    </Layer>

    </Map>


    </div>
  )
}


}

export default Mapbox
