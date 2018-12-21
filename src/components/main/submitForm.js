import React, { Component } from 'react';

class SubmitForm extends React.Component {

  clickHandler = (e) => {
    e.preventDefault()
    fetch('http://localhost:4000/api/v1/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        listing: {
          user_id: 1,
          item: 'something',
          condition: 'new',
          location: 'Elmhurst, NY',
          picture: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Guy_Fieri_at_Guantanamo_2.jpg'
        }
      })
    })
    .then(r => r.json())
    .then(console.log)
    }

  render () {

    return (
      <form onSubmit = {(e) => this.clickHandler(e)}>
        <label>
          Item:
          <input type="text" name="item" />
        </label>
        <br/>
        <label>
          Condition:
          <input type="text" name="condition" />
        </label>
        <br/>
        <label>
          Location:
          <input type="text" name="location" />
        </label>
        <br/>
        <label>
          Picture:
          <input type="text" name="picture" />
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    )
  }



}
export default SubmitForm
