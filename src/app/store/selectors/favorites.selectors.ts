import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { FavoriteLocation } from '../../models/favorite-location.model';

export const selectFavorites = createSelector(
  (state: AppState) => state.favorites,
  (favorites) => favorites
);

export const isLocationInFavorites = (location: FavoriteLocation) =>
  createSelector(selectFavorites, (favorites: FavoriteLocation[]) =>
    favorites.some((favorite) => favorite.locationKey === location.locationKey)
  );
