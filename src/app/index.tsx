import React from 'react'
import { Route, Switch } from 'react-router'
import Home from './components/home'
import { hot } from 'react-hot-loader'

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
))
