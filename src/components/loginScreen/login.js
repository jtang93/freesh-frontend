import React, { Component } from 'react';

const Login = props => {
  return (
    <div>
      Login
      <form>
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
