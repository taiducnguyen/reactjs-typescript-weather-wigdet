import { WeatherActions } from '../../../types/models/actions/weather.action.model';
import { error as errorReducer } from './error.reducer'

interface IWeatherAction {
  type: WeatherActions,
  payload: any,
}

export interface IWeatherState {
  weather: Models.IWeatherConditionModel,
  airPollution: Models.IAirPollutionModel,
  location: Models.ILocationInfoModel,
  currentAndForecast: Models.ICurrentAndForcecastModel;
  errors: Models.IErrorModel;
  loading: boolean;
}

const defaultState: IWeatherState = {
  weather: {},
  airPollution: {},
  location: {},
  currentAndForecast: {},
  errors: {},
  loading: false
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
    case WeatherActions.WEATHER_LOADING:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}
