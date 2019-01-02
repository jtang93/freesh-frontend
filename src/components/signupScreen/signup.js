import React, { Component } from 'react';

const Signup = props => {

  let clickHandler = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: 'asdfasdf',
          password: 'hi',
          bio: 'King of Flavortown, USA',
          avatar: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Guy_Fieri_at_Guantanamo_2.jpg'
        }
      })
    })
    .then(r => r.json())
    .then(console.log)
    }

  return (
    <div  className="Container">
      Signup
      <form onSubmit={(e) => {
        clickHandler(e)}}>
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
