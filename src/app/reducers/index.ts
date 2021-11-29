import { combineReducers } from 'redux'
import { RootState } from './state'
import { weather } from './weather.reducer'

// Import reducers
export const rootReducer = combineReducers<RootState>({
  weather
})
