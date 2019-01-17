import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, FormControl } from 'react-bootstrap'
import SubmitForm from './submitForm'

class TopNav extends React.Component {

  state = {
    formDisplay: false,
    filterDisplay: false,
    listDisplay: false,
    listings: []
  }

  clickHandler = () => {
    let currentState = this.state.formDisplay
    this.setState({formDisplay: !currentState})
  }

  renderForm = () => {
    if (this.state.formDisplay) {
      return(
        <div className="popupForm" >
        <SubmitForm updateListings={this.props.updateListings}/>
        </div>
      )
    }
  }

  filterClickHandler = () => {
    let currentState = this.state.filterDisplay
    this.setState({filterDisplay: !currentState})
  }

  renderFilterInput = () => {
    if (this.state.filterDisplay) {
      return(
        <input
        type="text"
        className="navFilter"
        placeholder="Enter filter"
        onChange={this.changeHandler}
        />
      )
    }
  }

  changeHandler = (e) => {
    // this.setState({ [semanticInputData.name]: semanticInputData.value })
    this.props.filterListings(e.target.value)
  }

  listClickHandler = () => {
    let currentState = this.state.listDisplay
    this.setState({listDisplay: !currentState})
  }

  renderList = () => {
    if (this.state.listDisplay) {
      return(
        <div className="listDiv" >
        {this.renderCards()}
        </div>
      )
    }
  }

  renderCards = () => {
      let listCards = this.props.listings.map(listing =>
        <div className="listingCard">
          <p>Item: {listing.item}</p>
          <p>Condition: {listing.condition}</p>
          <p>Location: {listing.location}</p>
          <p><img className="popupImage" src={`https://res.cloudinary.com/dhoaj6ygx/image/upload/v1546474612/item${listing.id}.jpg`}/></p>
        </div>
      )
      return(
        <div className="cardsContainer">
          {listCards}
        </div>)
  }

  componentWillReceiveProps(nextProps) {
    let newListings = nextProps.listings
    // if (newListings.length != 0) {
      this.setState({listings: newListings})
      // debugger
      // console.log('coordinates:',this.cStringToGeocode(newListings[newListings.length-1]) )
    // }
  }

render() {
  return(
    <div>
    <Navbar inverse collapseOnSelect className="navbarContainer">
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#brand">FREESH</a>
      </Navbar.Brand>
      <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>

      <Nav>
        <NavItem onSelect={() => this.listClickHandler()}>
          List
        </NavItem>
        <NavItem onSelect={() => this.filterClickHandler()}>
          Filter
        </NavItem>
        {this.renderFilterInput()}
      </Nav>

      <Nav pullRight>
        <Button bsStyle="info" className="navBarBtn" onClick={() => this.clickHandler()}>New Listing</Button>
      </Nav>
      {/*
        <Nav pullRight>
        <NavItem eventKey={1} href="#">
        Settings
        </NavItem>
        <NavItem eventKey={2} href="#">
        Log Out
        </NavItem>
        </Nav>
      */}
      </Navbar.Collapse>
    </Navbar>

    {this.renderForm()}

      {this.renderList()}

    </div>
  )
}
}

export default TopNav
