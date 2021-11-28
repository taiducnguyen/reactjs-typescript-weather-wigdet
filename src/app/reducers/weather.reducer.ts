import { WeatherActions } from 'app/models/actions/weather.action.model'
import { IAirPollutionDetailModel, ICurrentAndForcecastModel, IErrorModel, ILocationInfoModel, IWeatherConditionModel } from 'app/models'
import { error as errorReducer } from './Error.reducer'

interface IWeatherAction {
    type: WeatherActions,
    payload: any,
}

export interface IWeatherState {
    weather: IWeatherConditionModel,
    airPollution: IAirPollutionDetailModel,
    location: ILocationInfoModel,
    currentAndForecast: ICurrentAndForcecastModel;
    errors: IErrorModel;
}

const defaultState: IWeatherState = {
  weather: {},
  airPollution: {},
  location: {},
  currentAndForecast: {},
  errors: {}
}

export const weather = (state = defaultState, action: IWeatherAction) => {
  const { type, payload } = action
  switch (type) {
    case WeatherActions.WEATHER_RECEIVE_ICONS:
    case WeatherActions.WEATHER_RECEIVE_LOCATION:
    case WeatherActions.WEATHER_RECEIVE_AIR_POLLUTION:
    case WeatherActions.WEATHER_RECEIVE_CURRENT_AND_FORECAST:
      return {
        ...state,
        errors: {},
        ...payload
      }
    case WeatherActions.WEATHER_ERROR:
      return {
        ...state,
        errors: errorReducer(state.errors, payload)
      }
    default:
      return state
  }
}
