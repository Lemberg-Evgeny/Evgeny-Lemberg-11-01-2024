// import { createSelector } from '@ngrx/store';
// import { AppState } from '../reducers';
// import { FavoriteLocation } from '../../models/favorite-location.model';

// export const selectFavorites = createSelector(
//   (state: AppState) => state.favorites,
//   (favorites) => favorites
// );

// export const isLocationInFavorites = (location: FavoriteLocation) =>
//   createSelector(selectFavorites, (favorites: FavoriteLocation[]) =>
//     favorites.some((favorite) => favorite.locationKey === location.locationKey)
//   );

import { createSelector, createFeatureSelector  } from '@ngrx/store';
import { FavoritesState } from '../reducers/favorites.reducer';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectFavoriteLocations = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.locations
);

export const selectIsFavorite = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.isFavorite
);