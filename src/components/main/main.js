import React, { Component } from 'react'
import TopNav from './navbar'
import Map from './mapbox'

export default class Main extends React.Component {

  state = {
    allListings: [],
    listings: [],
    filter: null
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/v1/listings')
    .then(r => r.json())
    .then(parsed => {
      this.setState({listings: parsed})
      this.setState({allListings: parsed})
      console.log(this.state.listings)
    })
  }

  updateListings = (item) => {
    let listings = this.state.listings
    this.setState({listings: [...listings, item]})
    this.setState({allListings: [...listings, item]})
  }

  filterListings = (filter) => {
    let listings = this.state.allListings
    let filteredListings = listings.filter(listing => listing.item.includes(filter))
    // debugger
    this.setState({listings: filteredListings})
  }

  render () {
    return(
    <div>
      <TopNav updateListings={this.updateListings} filterListings={this.filterListings} listings={this.state.listings}/>
      <Map listings={this.state.listings} />
    </div>
    )
  }
}
