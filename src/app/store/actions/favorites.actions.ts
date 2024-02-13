import { createAction, props } from '@ngrx/store';
import { FavoriteLocation } from 'src/app/models/favorite-location.model';

export const loadFavorites = createAction('[Favorites] Load Favorites');
export const favoritesLoaded = createAction(
  '[Favorites] Favorites Loaded',
  props<{ favorites: FavoriteLocation[] }>()
);
export const favoritesLoadError = createAction(
  '[Favorites] Favorites Load Error',
  props<{ error: any }>()
);

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ location: FavoriteLocation }>()
);
export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ location: FavoriteLocation }>()
);
