import { WeatherUnits } from 'app/models'

const _weatherApiEndpoint = 'http://api.openweathermap.org'
const _apiId = '1c5da32bd6a0d1c4c017b21b49833c7f'

export const getLocationByCityName = async (cityName: string) => {
  const response = await fetch(`${_weatherApiEndpoint}/geo/1.0/direct?q=${cityName}&appid=${_apiId}`)
  return response.json()
}

export const getWeatherIconByCityName = async (cityName: string) => {
  const response = await fetch(`${_weatherApiEndpoint}/data/2.5/weather?q=${cityName}&appid=${_apiId}`)
  return response.json()
}

export const getCurrentAndForecastWeatherData = async (lat: number, lon: number, units: WeatherUnits) => {
  const response = await fetch(`${_weatherApiEndpoint}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${_apiId}`)
  return response.json()
}

export const getAirPollutionWeatherData = async (lat: number, lon: number) => {
  const response = await fetch(`${_weatherApiEndpoint}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${_apiId}`)
  return response.json()
}
