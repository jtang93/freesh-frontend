import React, { Component } from 'react';

const Login = props => {

  const loginHandler = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer <token>`
      }
    })
  }

  return (
    <div className="Container">
      Login
      <form onSubmit = {(e) => {loginHandler(e)}}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br/>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Login
