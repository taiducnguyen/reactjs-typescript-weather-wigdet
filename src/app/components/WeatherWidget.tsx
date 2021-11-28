import { RootState } from 'app/reducers/state'
import React, { useEffect, ChangeEvent, useCallback, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAirPollution, getCurrentAndForecast, getLocation } from '../actions/weather.action'
import { isEmpty, debounce } from 'lodash'
import { ICurrentAndForcecastItemModel, IDailyAndForcecastItemModel, WeatherUnits } from 'app/models'
import { convertUnixTimeStampToTime, formatTime, getNameOfDays } from 'app/utils/contants'

const WeatherWidgetContainer = () => {
  const { airPollution, location, currentAndForecast } = useSelector(
    (state: RootState) => state.weather
  )

  const [currentCityName, setCurrentCityName] = useState('')
  const [currentUnit, setCurrentUnit] = useState<WeatherUnits>(WeatherUnits.Imperial)
  const [firstLoad, setFirstLoad] = useState(true)
  const [currentWeatherInfo, setCurrentWeatherInfo] = useState<ICurrentAndForcecastItemModel>({})
  const [dailyWeatherInfo, setDailyWeatherInfo] = useState<IDailyAndForcecastItemModel[]>([])
  // const [currentWeatherAirPollution, setCurrentWeatherAirPollution] = useState({});

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
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    debounceInputChange(e.target.value)
  }, [])

  // Handle input change with debounce
  const debounceInputChange = useCallback(debounce((value: string) => {
    setCurrentCityName(value?.trim())
  }, 2000), [setCurrentCityName])

  // Clear input value
  const clearInputData = useCallback(() => {
    if (inputElm.current) {
      inputElm.current.value = ''
      setCurrentCityName('')
    }
  }, [setCurrentCityName])

  const getDayFromTimeStamp = useCallback((timeStamp: number) => {
    if (timeStamp) {
      const currentDate = convertUnixTimeStampToTime(timeStamp);
      return currentDate.getDay()
    }
    return timeStamp
  }, []);

  return (
    <div className="weather-widget__card">
      <div className="weather-widget__form">
        <div className="weather-widget__search-input-wrapper">
          <input ref={inputElm} defaultValue={currentCityName} type="text" placeholder="Enter city name extractly to get the weather information" onChange={(e) => handleInputChange(e)} className="weather-widget__search-input" />
          {currentCityName && <button className="weather-widget__clear-btn" type="button" onClick={(e) => clearInputData()}>
            <img src={require('../assets/images/close.svg').default} alt="Weather icon" />
          </button>}
        </div>
        {!isEmpty(location) && <div className="weather-widget__information">
          <h3 className="weather-widget__location">{location.name}, {location.country}</h3>
          <span className="weather-widget__current-date">{currentWeatherInfo.dt && <span>{getNameOfDays(getDayFromTimeStamp(currentWeatherInfo.dt))} {formatTime(convertUnixTimeStampToTime(currentWeatherInfo.dt))}</span>} • {currentWeatherInfo.weather && <span className="weather-widget__current-state"> {currentWeatherInfo.weather[0].description}</span>}</span>
          <div className="weather-widget__current-info">
            <div className="weather-widget__current-overall">
              {currentWeatherInfo.weather && <img src={require(`../assets/images/${currentWeatherInfo.weather[0].icon}@2x.png`).default} alt={currentWeatherInfo.weather[0].description} />}
              {currentWeatherInfo.temp && <h2 className="weather-widget__current-temperature">{Math.round(currentWeatherInfo.temp)}°</h2>}
              <div className="weather-widget__current-unit">
                <a onClick={() => setCurrentUnit(WeatherUnits.Imperial)} className={currentUnit !== WeatherUnits.Imperial ? 'inactive' : ''}>F</a>{' '}/{' '}
                <a onClick={() => setCurrentUnit(WeatherUnits.Metric)} className={currentUnit !== WeatherUnits.Metric ? 'inactive' : ''}>C</a>
              </div>
            </div>
            <div className="weather-widget__current-others">
              <span>Humidity: {currentWeatherInfo.humidity}%</span>
              <span>Wind: {currentWeatherInfo.wind_speed} KPH SE</span>
              <span>Air Quality: Moderate</span>
            </div>
          </div>
          <div className="weather-widget__day-wrapper">
            {dailyWeatherInfo && dailyWeatherInfo.map((item, index) =>
              <a className="weather-widget__day-item" key={index}>
                {item.dt && <h5 className="weather-widget__day-name">{getNameOfDays(getDayFromTimeStamp(item.dt))}</h5>}
                {item.weather && <img src={require(`../assets/images/${item.weather[0].icon}@2x.png`).default} alt={`${item.weather[0].description}`} />}
                {item.temp && <h4 className="weather-widget__day-max-temperature">{Math.round(item.temp.max)}°</h4>}
                {item.temp && <h6 className="weather-widget__day-min-temperature">{Math.round(item.temp.min)}°</h6>}
              </a>
            )}
          </div>
        </div>}
        {isEmpty(location) && <div className="weather-widget__empty">
          <img src={require('../assets/images/no-weather.svg').default} alt="Weather in day icon" />
          <p className="weather-widget__empty-message">We could not find weather information for the location above</p>
        </div>}
      </div>
    </div>
  )
}

export default WeatherWidgetContainer
