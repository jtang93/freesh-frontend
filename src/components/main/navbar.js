import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap'
import SubmitForm from './submitForm'

class TopNav extends React.Component {

  state = {
    formDisplay: false
  }

  clickHandler = () => {
    let currentState = this.state.formDisplay
    this.setState({formDisplay: !currentState})
  }

  renderForm = () => {
    if (this.state.formDisplay) {
      return(
        <SubmitForm />
      )
    }
  }

render() {

  return(
    <Navbar inverse collapseOnSelect className="navbarContainer">
    <Navbar.Header>
    <Navbar.Brand>
    <a href="#brand">Freesh</a>
    </Navbar.Brand>
    <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
    <Nav>

    <NavItem eventKey={1} href="#">
    Search
    </NavItem>

    <Button bsStyle="info" onClick={() => this.clickHandler()}>New Listing</Button>

    {this.renderForm()}

    </Nav>
    <Nav pullRight>
    <NavItem eventKey={1} href="#">
    Settings
    </NavItem>
    <NavItem eventKey={2} href="#">
    Log Out
    </NavItem>
    </Nav>
    </Navbar.Collapse>
    </Navbar>
  )
}
}

export default TopNav
