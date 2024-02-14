import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { FavoriteLocation } from '../models/favorite-location.model';
import { AppState } from '../store/reducers';
import {
  addFavorite,
  removeFavorite,
  checkFavorite,
} from '../store/actions/favorites.actions';
import {
  selectFavoriteLocations,
  selectIsFavorite,
} from '../store/selectors/favorites.selectors';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private store: Store<AppState>) {}

  addToFavorites(location: FavoriteLocation): void {
    this.store.dispatch(addFavorite({ location }));
  }

  removeFromFavorites(location: FavoriteLocation): void {
    this.store.dispatch(removeFavorite({ location }));
  }

  isLocationInFavorites(location: FavoriteLocation): Observable<boolean> {
    return this.store.select((state) =>
      state.favorites.locations.some(
        (loc) => loc.locationKey == location.locationKey
      )
    );
  }

  checkIfFavorite(location: FavoriteLocation): boolean {
    let isFavorite: boolean = false;

    this.store.dispatch(checkFavorite({ location }));

    this.store
      .select(selectIsFavorite, { location })
      .pipe(take(1))
      .subscribe((result) => {
        isFavorite = result;
      });

    return isFavorite;
  }

  getFavorites(): Observable<FavoriteLocation[]> {
    return this.store.select(selectFavoriteLocations);
  }
}
