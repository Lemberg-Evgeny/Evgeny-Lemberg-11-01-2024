import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { FavoriteLocation } from 'src/app/models/favorite-location.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteLocation[] = [];
  weatherData: any[] = [];
  favoritesIsEmpty: boolean = true;

  constructor(
    private favoriteService: FavoriteService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.favoriteService.getFavorites().subscribe((favorites) => {
      if (favorites.length > 0) {
        this.favoritesIsEmpty = false;
        this.favorites = favorites;
        this.getWeatherForFavorites();
      }
    });
  }

  getWeatherForFavorites(): void {
    const requests: Observable<any>[] = this.favorites.map((location) => {
      return this.weatherService.getCurrentWeather(location.locationKey);
    });

   forkJoin(requests).subscribe({
      next: (responses: any[]) => {
        responses.forEach((currentWeather, index) => {
          const favoriteLocation = {
            locationName: this.favorites[index].locationName,
            currentWeather: currentWeather[0],
          };
          this.weatherData.push(favoriteLocation);
        });
      },
      error: (error) => {
        console.error('Error fetching weather data for favorites:', error);
      },
    })
 
  }


}
