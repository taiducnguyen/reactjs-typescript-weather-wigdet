import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from 'app/store'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app/routes'
import './app/styles/style.scss'

// prepare store
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
