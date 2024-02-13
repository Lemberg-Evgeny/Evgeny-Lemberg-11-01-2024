import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import * as WeatherActions from '../actions/weather.actions';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeather),
      switchMap((action) =>
        this.weatherService.getLocationAutocomplete(action.type).pipe(
          map((weatherData) =>
            WeatherActions.weatherLoaded({ data: weatherData })
          ),
          catchError((error) => of(WeatherActions.weatherLoadError({ error })))
        )
      )
    )
  );
}
