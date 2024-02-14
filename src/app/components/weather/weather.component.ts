import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Subscription } from 'rxjs';
import { FavoriteLocation } from 'src/app/models/favorite-location.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  locationKey: string = '';
  currentWeather: any;
  forecast: any[] = [];
  isLoading: boolean = false;
  isFavorite: boolean = false;
  searchValue: string = 'Tel aviv';

  private getLocationSubscription: Subscription | undefined;
  private weatherSubscription: Subscription | undefined;
  private forecastSubscription: Subscription | undefined;

  constructor(
    private weatherService: WeatherService,
    private favoriteService: FavoriteService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getWeatherDetails(this.searchValue);
  }

  searchLocation(query: string): void {
    this.getWeatherDetails(query);
  }

  getWeatherDetails(location: string): void {
    this.isLoading = true;
    this.getLocationSubscription = this.weatherService
      .getLocationAutocomplete(location)
      .subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            this.locationKey = response[0].Key;
            this.weatherSubscription = this.weatherService
              .getCurrentWeather(this.locationKey)
              .subscribe((currentWeather) => {
                this.currentWeather = currentWeather[0];
              });

            this.forecastSubscription = this.weatherService
              .get5DayForecast(this.locationKey)
              .subscribe((forecast) => {
                this.forecast = forecast.DailyForecasts;
              });

            const favoriteLocation: FavoriteLocation = {
              locationKey: this.locationKey,
              locationName: location,
            };

            this.isFavorite = this.favoriteService.checkIfFavorite(favoriteLocation);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          setTimeout(() => (this.isLoading = false), 2000);
        },
      });
  }

  toggleFavorite(location: string): void {
    const favoriteLocation: FavoriteLocation = {
      locationKey: this.locationKey,
      locationName: location,
    };

    if (this.isFavorite) {
      this.favoriteService.removeFromFavorites(favoriteLocation);
      this.openSnackBar(`${location} Removed from favorites`, 'OK');
    } else {
      this.favoriteService.addToFavorites(favoriteLocation);
      this.openSnackBar(`${location} Added to favorites`, 'OK');
    }

    this.isFavorite = !this.isFavorite;
  }

  unsubscribe(): void {
    if (this.getLocationSubscription) {
      this.getLocationSubscription.unsubscribe();
    }
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
    if (this.forecastSubscription) {
      this.forecastSubscription.unsubscribe();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
