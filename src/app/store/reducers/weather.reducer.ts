import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions/weather.actions';

export const initialState = null;

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.weatherLoaded, (state, { data }) => data),
  on(WeatherActions.weatherLoadError, (state, { error }) => initialState)
);
