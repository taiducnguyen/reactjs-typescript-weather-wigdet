import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from 'app/store'
import { AppRoutes } from './app/routes'
import './app/styles/style.scss'

// prepare store
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('root')
)
