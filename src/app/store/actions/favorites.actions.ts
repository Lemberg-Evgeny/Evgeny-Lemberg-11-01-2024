
import { createAction, props } from '@ngrx/store';
import { FavoriteLocation } from '../../models/favorite-location.model';

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ location: FavoriteLocation }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ location: FavoriteLocation }>()
);

export const checkFavorite = createAction(
  '[Favorites] Check Favorite',
  props<{ location: FavoriteLocation }>()
);