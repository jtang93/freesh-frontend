import React, { Component } from 'react';
import { connect } from 'react-redux';


const Login = props => {

  const loginHandler = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0fQ.oFQeWUjCQx5X2vxlAH_bzAKijAkSbiS2hW9-EQS883o`
      }
    })
    .then(response => response.json())
    .then((JSONResponse) => {
      // dispatch(setCurrentUser(JSONResponse.user))
      console.log(JSONResponse)
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

export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData
})

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

// tell our app we're currently fetching
export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
// export const authenticatingUser = () => {
//   return { type: 'AUTHENTICATING_USER' }
// }

export default Login
