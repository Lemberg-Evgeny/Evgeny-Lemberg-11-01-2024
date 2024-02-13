import { Component, OnInit } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import {
  FavoriteService,
  FavoriteLocation,
} from 'src/app/services/favorite.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoriteLocations: FavoriteLocation[] = [];
  weatherData: any[] = [];
  favoritesIsEmpty: boolean = false;
  private weatherSubscription: Subscription | undefined;

  constructor(
    private favoriteService: FavoriteService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.favoriteLocations = this.favoriteService.getFavorites();
    this.getWeatherForFavorites();
  }

  getWeatherForFavorites(): void {
    if (this.favoriteLocations.length === 0) {
      return;
    }

    const requests = this.favoriteLocations.map((location) =>
      this.weatherService.getCurrentWeather(location.locationKey)
    );

    this.weatherSubscription = forkJoin(requests).subscribe({
      next: (responses: any[]) => {
        responses.forEach((currentWeather, index) => {
          const favoriteLocation = {
            locationName: this.favoriteLocations[index].locationName,
            currentWeather: currentWeather[0],
          };
          this.weatherData.push(favoriteLocation);
          console.log('wd', this.weatherData);
        });
      },
      error: (error) => {
        console.error('Error fetching weather data for favorites:', error);
      },
    });

    console.log('fl', this.favoriteLocations);
  }

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
