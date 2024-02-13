import { combineReducers } from '@ngrx/store';
import { favoritesReducer } from './favorites.reducer';
import { weatherReducer } from './weather.reducer';

export const rootReducer = combineReducers({
  favorites: favoritesReducer,
  weather: weatherReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
