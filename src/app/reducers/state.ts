import { IWeatherState } from './weather.reducer'

export interface RootState {
  router?: any;
  weather: IWeatherState;
}
