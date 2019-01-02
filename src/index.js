import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'
// import store from './reducers/store'
import productsReducer from './reducers/productsReducer'
import usersReducer from './reducers/usersReducer'


const allReducers = combineReducers({
  products: productsReducer,
  user: usersReducer
})

const store = createStore(
  allReducers,
  {
    products: [{name: 'iPhone'}],
    user: 'Michael'
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
