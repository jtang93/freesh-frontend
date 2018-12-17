import React, { Component } from 'react';

const Signup = props => {
  return (
    <div>
      Signup
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
        <label>
          Bio:
          <input type="text" name="bio" />
        </label>
        <br/>
        <label>
          Avatar:
          <input type="text" name="avatar" />
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Signup
