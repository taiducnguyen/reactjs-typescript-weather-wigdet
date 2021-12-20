import { WeatherUnits } from 'app/models'
import HttpClient from './http-axios.service'

export default class WeatherService {
  private _apiUrl = process.env.NODE_ENV === 'development' ? 'http://api.openweathermap.org' : 'https://api.openweathermap.org'
  private _apiId = '1c5da32bd6a0d1c4c017b21b49833c7f'
  private _httpClient: HttpClient

  constructor () {
    this._httpClient = new HttpClient(this._apiUrl)
  }

  getLocationByCityName = (cityName: string): Promise<any> => {
    return this._httpClient.get(`/geo/1.0/direct?q=${cityName}&appid=${this._apiId}`)
  }

  getWeatherIconsByCityName = (cityName: string): Promise<any> => {
    return this._httpClient.get(`/data/2.5/weather?q=${cityName}&appid=${this._apiId}`)
  }

  getCurrentAndForecastWeatherData = (lat: number, lon: number, units: WeatherUnits): Promise<any> => {
    return this._httpClient.get(`/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${this._apiId}`)
  }

  getAirPollutionWeatherData = (lat: number, lon: number): Promise<any> => {
    return this._httpClient.get(`/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${this._apiId}`)
  }
}
