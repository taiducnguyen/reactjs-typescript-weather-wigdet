import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import NotFound from './modules/NotFound'
import Timer from './modules/Timer'
import WeatherWidgetContainer from './modules/WeatherWidget'

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WeatherWidgetContainer />} />
      <Route path="/timer" element={<Timer />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)
