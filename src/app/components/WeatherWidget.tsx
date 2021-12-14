import { RootState } from 'app/reducers/state'
import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAirPollution, getCurrentAndForecast, getLocation } from '../actions/weather.action'
import { isEmpty, debounce } from 'lodash'
import { ICurrentAndForcecastItemModel, IDailyAndForcecastItemModel, WeatherUnits } from 'app/models'
import { convertUnixTimeStampToTime, convertDegToDirection, equalDate, formatTime, getNameOfDays, currentDate, getAirQuality, getFullNameOfDays } from 'app/utils/weather-helper'
import LoadingIndicator from './LoadingIndicator'
import Timer from './Timer';

const WeatherWidgetContainer = () => {
  const { airPollution, location, currentAndForecast, errors, loading } = useSelector(
    (state: RootState) => state.weather
  )

  const [currentCityName, setCurrentCityName] = useState('')
  const [showClearInputButton, setShowClearInputButton] = useState(false)
  const [currentUnit, setCurrentUnit] = useState<WeatherUnits>(WeatherUnits.Metric)
  const [firstLoad, setFirstLoad] = useState(true)
  const [currentWeatherInfo, setCurrentWeatherInfo] = useState<ICurrentAndForcecastItemModel | IDailyAndForcecastItemModel>({})
  const [dailyWeatherInfo, setDailyWeatherInfo] = useState<IDailyAndForcecastItemModel[]>([])
  const inputElm = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  // Get location from city name
  useEffect(() => {
    if (!firstLoad) {
      dispatch(getLocation(currentCityName))
    } else {
      setFirstLoad(false)
    }
  }, [dispatch, currentCityName])

  useEffect(() => {
    if (currentAndForecast.current) {
      setCurrentWeatherInfo(currentAndForecast.current)
    }
    if (currentAndForecast.daily) {
      setDailyWeatherInfo(currentAndForecast.daily)
    }
  }, [airPollution, currentAndForecast])

  // Get current and forecast data
  useEffect(() => {
    if (location?.lat && location?.lon) {
      dispatch(getCurrentAndForecast(location.lat, location.lon, currentUnit))
    }
  }, [dispatch, location, currentUnit])

  // get air pollution data
  useEffect(() => {
    if (location?.lat && location?.lon) {
      dispatch(getAirPollution(location.lat, location.lon))
    }
  }, [dispatch, location])

  // Handle input change
  const handleInputChange = useCallback((value: string) => {
    debounceInputChange(value)
    setShowClearInputButton(!!value)
  }, [])

  // Handle input change with debounce
  const debounceInputChange = useCallback(debounce((value: string) => {
    setCurrentCityName(value?.trim())
  }, 1500), [setCurrentCityName])

  // Clear input value
  const clearInputData = useCallback(() => {
    if (inputElm.current) {
      inputElm.current.value = ''
      setCurrentCityName('')
    }
  }, [debounceInputChange])

  const getDayFromTimeStamp = useCallback((timeStamp: number, timeZone: string) => {
    if (timeStamp) {
      const currentDate = convertUnixTimeStampToTime(timeStamp, timeZone)
      return currentDate.getDay()
    }
    return timeStamp
  }, [])

  const getCurrentWeather = useCallback(() => {
    if (typeof currentWeatherInfo.temp === 'object') {
      const currentDate = new Date(new Date().toLocaleString('en-US', { timeZone: currentAndForecast.timezone }))
      if (equalDate(currentWeatherInfo.dt || 0, currentDate.getTime() / 1000, currentAndForecast.timezone || '')) {
        return {
          temp: currentAndForecast.current?.temp,
          icon: currentAndForecast.current?.weather && currentAndForecast.current?.weather[0].icon,
          time: formatTime(convertUnixTimeStampToTime(currentAndForecast.current?.dt || 0, currentAndForecast.timezone || ''))
        }
      }
      return {
        temp: currentWeatherInfo.temp?.max,
        icon: currentWeatherInfo.weather && currentWeatherInfo.weather[0].icon,
        time: ''
      }
    }
    return {
      temp: currentWeatherInfo?.temp,
      icon: currentWeatherInfo?.weather && currentWeatherInfo.weather[0].icon,
      time: formatTime(convertUnixTimeStampToTime(currentWeatherInfo?.dt || 0, currentAndForecast?.timezone || ''))
    }
  }, [currentWeatherInfo, currentAndForecast])

  return (
    <>
      <div className="weather-widget__card">
        <div className="weather-widget__search-input-wrapper">
          <input ref={inputElm} defaultValue={currentCityName} disabled={loading} type="text" placeholder="Enter city name extractly to get the weather information" onChange={(e) => handleInputChange(e.target.value)} className="weather-widget__search-input" />
          {showClearInputButton && <button className="weather-widget__clear-btn" type="button" onClick={(e) => clearInputData()}>
            <img src={require('../assets/images/close.svg').default} alt="Clear input button icon" />
          </button>}
        </div>
        <div className="weather-widget__card-content">
          <LoadingIndicator loading={loading} className="weather-widget__loading" />
          {(!isEmpty(location) && !isEmpty(currentAndForecast) && !isEmpty(airPollution)) && <div className="weather-widget__information">
            <h3 className="weather-widget__location">{location.name}, {location.country}</h3>
            <span className="weather-widget__current-date">{(currentWeatherInfo.dt && currentAndForecast.timezone) && <span>{getFullNameOfDays(getDayFromTimeStamp(currentWeatherInfo.dt, currentAndForecast.timezone))} {getCurrentWeather().time}</span>} • {currentWeatherInfo.weather && <span className="weather-widget__current-state"> {currentWeatherInfo.weather[0].description}</span>}</span>
            <div className="weather-widget__current-info">
              <div className="weather-widget__current-overall">
                {currentWeatherInfo.weather && <img src={require(`../assets/images/${getCurrentWeather().icon}@2x.png`).default} alt={currentWeatherInfo.weather[0].description} />}
                <h2 className="weather-widget__current-temperature">{Math.round(getCurrentWeather().temp || 0)}°</h2>
                <div className="weather-widget__current-unit">
                  <a onClick={() => setCurrentUnit(WeatherUnits.Imperial)} className={currentUnit !== WeatherUnits.Imperial ? 'inactive' : ''}>F</a>{' '}/{' '}
                  <a onClick={() => setCurrentUnit(WeatherUnits.Metric)} className={currentUnit !== WeatherUnits.Metric ? 'inactive' : ''}>C</a>
                </div>
              </div>
              <div className="weather-widget__current-others">
                <span>Humidity: {currentWeatherInfo.humidity}%</span>
                <span>Wind: {currentWeatherInfo.wind_speed} {currentUnit === WeatherUnits.Imperial ? 'MPH' : 'KPH'} {currentWeatherInfo.wind_deg ? convertDegToDirection(currentWeatherInfo.wind_deg) : ''}</span>
                {(!isEmpty(currentWeatherInfo) && !isEmpty(currentAndForecast) && equalDate(currentWeatherInfo.dt || 0, currentDate(currentAndForecast.timezone || '').getTime() / 1000, currentAndForecast.timezone || '')) && <span>Air Quality: {getAirQuality((airPollution.list && airPollution.list[0]?.main?.aqi) || 0)}</span>}
              </div>
            </div>
            <div className="weather-widget__day-wrapper">
              {dailyWeatherInfo && dailyWeatherInfo.map((item, index) =>
                <a onClick={() => setCurrentWeatherInfo(item)} className={`weather-widget__day-item ${equalDate(item.dt || 0, currentWeatherInfo.dt || 0, currentAndForecast.timezone || '') ? 'selected' : ''}`} key={index}>
                  {(item.dt && currentAndForecast.timezone) && <h5 className="weather-widget__day-name">{getNameOfDays(getDayFromTimeStamp(item.dt, currentAndForecast.timezone))}</h5>}
                  {item.weather && <img src={require(`../assets/images/${item.weather[0].icon}@2x.png`).default} alt={`${item.weather[0].description}`} />}
                  {item.temp && <h4 className="weather-widget__day-max-temperature">{Math.round(item.temp.max)}°</h4>}
                  {item.temp && <h6 className="weather-widget__day-min-temperature">{Math.round(item.temp.min)}°</h6>}
                </a>
              )}
            </div>
          </div>}
          {(isEmpty(location) || isEmpty(currentAndForecast) || isEmpty(airPollution)) && <div className="weather-widget__empty">
            <img src={require('../assets/images/no-weather.svg').default} alt="Weather in day icon" />
            <p className="weather-widget__empty-message">We could not find weather information for the location above</p>
          </div>}
        </div>
        {errors?.message && <span className="weather-widget__error-message">{errors?.message}</span>}
      </div>
      <Timer />
    </>
  )
}

export default WeatherWidgetContainer
