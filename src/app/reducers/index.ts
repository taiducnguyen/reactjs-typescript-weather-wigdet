import { combineReducers } from 'redux'
import { RootState } from './state'
import { weather } from './weather.reducer'

export const rootReducer = combineReducers<RootState>({
  weather
})
