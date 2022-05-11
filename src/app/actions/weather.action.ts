import WeatherService from '../services/weather.service'
import { WeatherActions } from '../../../types/models/actions/weather.action.model'
import { Dispatch } from 'redux'
import { WeatherUnits } from '../../../types/models/common-enums'
const _weatherService = new WeatherService()

const receiveWeatherIcons = (weather: Models.IWeatherConditionModel) => ({
  type: WeatherActions.WEATHER_RECEIVE_ICONS,
  payload: {
    weather
  }
})

const receiveLocation = (location: Models.ILocationInfoModel) => ({
  type: WeatherActions.WEATHER_RECEIVE_LOCATION,
  payload: {
    location
  }
})

const receiveWeatherAirPollution = (airPollution: Models.IAirPollutionModel) => ({
  type: WeatherActions.WEATHER_RECEIVE_AIR_POLLUTION,
  payload: {
    airPollution
  }
})

const receiveWeatherCurrentAndForecast = (currentAndForecast: Models.ICurrentAndForcecastModel) => ({
  type: WeatherActions.WEATHER_RECEIVE_CURRENT_AND_FORECAST,
  payload: {
    currentAndForecast
  }
})

const setError = (error: Models.IErrorModel) => ({
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

export const getLocation = (cityName: string) => (dispatch: Dispatch<any>): Promise<any> => {
  dispatch(setLoading(true))
  return _weatherService.getLocationByCityName(cityName).finally(() => dispatch(setLoading(false))).then(response => {
    const locations = response as Models.ILocationInfoModel[]
    dispatch(receiveLocation(locations[0]))
  }).catch((ex) => dispatch(setError(ex)))
}

export const getAirPollution = (lat: number, lon: number) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  return _weatherService.getAirPollutionWeatherData(lat, lon).finally(() => dispatch(setLoading(false))).then(response => {
    dispatch(receiveWeatherAirPollution(response as Models.IAirPollutionModel))
  }).catch((ex) => dispatch(setError(ex)))
}

export const getCurrentAndForecast = (lat: number, lon: number, units: WeatherUnits) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  return _weatherService.getCurrentAndForecastWeatherData(lat, lon, units).finally(() => dispatch(setLoading(false))).then(response => {
    dispatch(receiveWeatherCurrentAndForecast(response as Models.ICurrentAndForcecastModel))
  }).catch((ex) => dispatch(setError(ex)))
}

export const getWeatherIcons = (cityName: string) => (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  return _weatherService.getWeatherIconsByCityName(cityName).finally(() => dispatch(setLoading(false))).then(response => {
    dispatch(receiveWeatherIcons(response as Models.IWeatherConditionModel))
  }).catch((ex) => dispatch(setError(ex)))
}
