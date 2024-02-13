import { createAction, props } from '@ngrx/store';

export const loadWeather = createAction('[Weather] Load Weather');
export const weatherLoaded = createAction(
  '[Weather] Weather Loaded',
  props<{ data: any }>()
);
export const weatherLoadError = createAction(
  '[Weather] Weather Load Error',
  props<{ error: any }>()
);
