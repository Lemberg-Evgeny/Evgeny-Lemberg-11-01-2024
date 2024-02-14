
import { Action, createReducer, on } from '@ngrx/store';
import * as FavoritesActions from '../actions/favorites.actions';
import { FavoriteLocation } from '../../models/favorite-location.model';

export interface FavoritesState {
  locations: FavoriteLocation[];
  isFavorite:boolean;
}

export const initialState: FavoritesState = {
  locations: [],
  isFavorite: false
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.addFavorite, (state, { location }) => ({
    ...state,
    locations: [...state.locations, location],
    isFavorite:true
  })),
  on(FavoritesActions.removeFavorite, (state, { location }) => ({
    ...state,
    locations: state.locations.filter(loc => loc.locationKey !== location.locationKey),
    isFavorite:false
  })),
  on(FavoritesActions.checkFavorite, (state, { location }) => ({
    ...state,
    isFavorite: state.locations.some(loc => loc.locationKey === location.locationKey)
  }))
);

export function reducer(state: FavoritesState | undefined, action: Action) {
  return favoritesReducer(state, action);
}