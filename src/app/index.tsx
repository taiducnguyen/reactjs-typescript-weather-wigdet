import React from 'react'
import { Route, Switch } from 'react-router'
import WeatherWidgetContainer from './components/WeatherWidget'
import { hot } from 'react-hot-loader'
import './styles/style.scss'

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={WeatherWidgetContainer} />
  </Switch>
))
