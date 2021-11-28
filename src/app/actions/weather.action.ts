import { getWeatherIconByCityName, getLocationByCityName, getAirPollutionWeatherData, getCurrentAndForecastWeatherData } from '../services/weather.service'
import { WeatherActions } from '../models/actions/weather.action.model'
import { IAirPollutionModel, ICurrentAndForcecastModel, ILocationInfoModel, IWeatherConditionModel, WeatherUnits } from '../models/weather.model'
import { Dispatch } from 'redux'
import { catchError } from './error.action'

const receiveWeatherIcons = (weather: IWeatherConditionModel) => ({
  type: WeatherActions.WEATHER_RECEIVE_ICONS,
  payload: {
    weather
  }
})

const receiveLocation = (location: ILocationInfoModel) => ({
  type: WeatherActions.WEATHER_RECEIVE_LOCATION,
  payload: {
    location
  }
})

const receiveWeatherAirPollution = (airPollution: IAirPollutionModel) => ({
  type: WeatherActions.WEATHER_RECEIVE_AIR_POLLUTION,
  payload: {
    airPollution
  }
})

const receiveWeatherCurrentAndForecast = (currentAndForecast: ICurrentAndForcecastModel) => ({
  type: WeatherActions.WEATHER_RECEIVE_CURRENT_AND_FORECAST,
  payload: {
    currentAndForecast
  }
})

const setError = (error: any) => ({
  type: WeatherActions.WEATHER_ERROR,
  payload: {
    error
  }
})

export const getLocation = (cityName: string) => (dispatch: Dispatch) => {
  return getLocationByCityName(cityName).then(response => {
    const locations = response as ILocationInfoModel[]
    dispatch(receiveLocation(locations[0]))
  }).catch((ex) => catchError(ex, (error: any) => setError(error)))
}

export const getAirPollution = (lat: number, lon: number) => (dispatch: Dispatch) => {
  return getAirPollutionWeatherData(lat, lon).then(response => {
    dispatch(receiveWeatherAirPollution(response as IAirPollutionModel))
  }).catch((ex) => catchError(ex, (error: any) => setError(error)))
}

export const getCurrentAndForecast = (lat: number, lon: number, units: WeatherUnits) => (dispatch: Dispatch) => {
  return getCurrentAndForecastWeatherData(lat, lon, units).then(response => {
    dispatch(receiveWeatherCurrentAndForecast(response as ICurrentAndForcecastModel))
  }).catch((ex) => catchError(ex, (error: any) => setError(error)))
}

export const getWeatherIcons = (cityName: string) => (dispatch: Dispatch) => {
  return getWeatherIconByCityName(cityName).then(response => {
    dispatch(receiveWeatherIcons(response as IWeatherConditionModel))
  }).catch((ex) => catchError(ex, (error: any) => setError(error)))
}
