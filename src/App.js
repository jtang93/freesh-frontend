import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './components/loginScreen/login.js'
import Signup from './components/signupScreen/signup'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <Signup />
      </div>
    );
  }
}

export default App;
