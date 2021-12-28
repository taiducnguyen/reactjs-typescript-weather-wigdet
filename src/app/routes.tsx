import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
// import NotFound from './components/NotFound'
import Timer from './components/Timer'
import WeatherWidgetContainer from './components/WeatherWidget'

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WeatherWidgetContainer />} />
      <Route path="/timer" element={<Timer />} />
      {/* <Route path='*' element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
)
