import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../reducers';

export const selectWeatherState = createFeatureSelector<AppState, any>(
  'weather'
);

export const selectWeatherData = createSelector(
  selectWeatherState,
  (state: any) => state
);
