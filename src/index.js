import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'
// import store from './reducers/store'
import listingsReducer from './reducers/listingsReducer'
import usersReducer from './reducers/usersReducer'


const allReducers = combineReducers({
  listings: listingsReducer,
  user: usersReducer
})

const store = createStore(
  allReducers,
  {
    user: 'Michael',
  },
  window.devToolsExtension && window.devToolsExtension()
  )

console.log(store.getState())

const updateUserAction = {
  type: 'updateUser',
  payload: {
    user: 'John'
  }
}

store.dispatch(updateUserAction)
console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
