import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FavoriteService } from '../../services/favorite.service';
import * as FavoriteActions from '../actions/favorites.actions';

@Injectable()
export class FavoritesEffects {
  constructor(
    private actions$: Actions,
    private favoriteService: FavoriteService
  ) {}

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.addFavorite),
      switchMap(() =>
        of(this.favoriteService.getFavorites()).pipe(
          map((favorites) => FavoriteActions.favoritesLoaded({ favorites })),
          catchError((error) =>
            of(FavoriteActions.favoritesLoadError({ error }))
          )
        )
      )
    )
  );
}
