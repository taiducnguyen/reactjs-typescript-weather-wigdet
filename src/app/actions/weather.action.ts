import WeatherService from '../services/weather.service'
import { WeatherActions } from '../models/actions/weather.action.model'
import { IAirPollutionModel, ICurrentAndForcecastModel, ILocationInfoModel, IWeatherConditionModel, WeatherUnits } from '../models/weather.model'
import { Dispatch } from 'redux'
import { IErrorModel } from 'app/models'
const _weatherService = new WeatherService()

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

const setError = (error: IErrorModel) => ({
  type: WeatherActions.WEATHER_ERROR,
  payload: {
    error
  }
})

const setLoading = (loading: boolean) => ({
  type: WeatherActions.WEATHER_LOADING,
  payload: {
    loading
  }
})

export const getLocation = (cityName: string) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  return _weatherService.getLocationByCityName(cityName).then(response => {
    const locations = response as ILocationInfoModel[]
    dispatch(receiveLocation(locations[0]))
    dispatch(setLoading(false))
  }).catch((ex) => dispatch(setError(ex)) && dispatch(setLoading(false)))
}

export const getAirPollution = (lat: number, lon: number) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  return _weatherService.getAirPollutionWeatherData(lat, lon).then(response => {
    dispatch(receiveWeatherAirPollution(response as IAirPollutionModel))
    dispatch(setLoading(false))
  }).catch((ex) => dispatch(setError(ex) && dispatch(setLoading(false))))
}

export const getCurrentAndForecast = (lat: number, lon: number, units: WeatherUnits) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  return _weatherService.getCurrentAndForecastWeatherData(lat, lon, units).then(response => {
    dispatch(receiveWeatherCurrentAndForecast(response as ICurrentAndForcecastModel))
    dispatch(setLoading(false))
  }).catch((ex) => dispatch(setError(ex) && dispatch(setLoading(false))))
}

export const getWeatherIcons = (cityName: string) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  return _weatherService.getWeatherIconsByCityName(cityName).then(response => {
    dispatch(receiveWeatherIcons(response as IWeatherConditionModel))
    dispatch(setLoading(false))
  }).catch((ex) => dispatch(setError(ex) && dispatch(setLoading(false))))
}
