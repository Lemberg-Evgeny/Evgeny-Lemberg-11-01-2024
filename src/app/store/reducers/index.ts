
import { ActionReducerMap } from '@ngrx/store';
import * as fromFavorites from './favorites.reducer';

export interface AppState {
  favorites: fromFavorites.FavoritesState;
}

export const reducers: ActionReducerMap<AppState> = {
  favorites: fromFavorites.reducer
};
