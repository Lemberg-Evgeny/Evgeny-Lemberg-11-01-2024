import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from '../actions/favorites.actions';
import { FavoriteLocation } from 'src/app/models/favorite-location.model';

export const initialState: FavoriteLocation[] = [];

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.addFavorite, (state, { location }) => [
    ...state,
    location,
  ]),
  on(FavoritesActions.removeFavorite, (state, { location }) =>
    state.filter((item) => item.locationKey !== location.locationKey)
  )
);
