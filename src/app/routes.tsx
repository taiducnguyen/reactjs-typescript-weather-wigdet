import React from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'
import NotFound from './components/NotFound'
import Timer from './components/Timer'
import WeatherWidgetContainer from './components/WeatherWidget'

export const AppRoutes = () => (
  <Routes>
    <Route path='*' element={<NotFound />} />
    <Route path="/" element={<WeatherWidgetContainer />} />
    <Route path="/timer" element={<Timer />} />
  </Routes>
)
