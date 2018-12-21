import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import logo from './logo.svg';
import Login from './components/loginScreen/login.js'
import Signup from './components/signupScreen/signup'
import Mapbox from './components/main/mapbox'
import TopNav from './components/main/navbar'
import Main from './components/main/main'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/map" component={Main} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App)
