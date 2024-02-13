import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'SWoD9t6PTK2fRGR7E4W8EpSUR59uFsML';
  private apiUrl = 'https://dataservice.accuweather.com';

  constructor(private http: HttpClient) {}

  getLocationAutocomplete(query: string): Observable<any> {
    const endpoint = '/locations/v1/cities/autocomplete';
    const params = {
      apikey: this.apiKey,
      q: query,
    };

    return this.http.get(`${this.apiUrl}${endpoint}`, { params });
  }

  getCurrentWeather(locationKey: string): Observable<any> {
    const endpoint = `/currentconditions/v1/${locationKey}`;
    const params = {
      apikey: this.apiKey,
    };
    return this.http.get(`${this.apiUrl}${endpoint}`, { params });
  }

  get5DayForecast(locationKey: string): Observable<any> {
    const endpoint = `/forecasts/v1/daily/5day/${locationKey}`;
    const params = {
      apikey: this.apiKey,
    };
    return this.http.get(`${this.apiUrl}${endpoint}`, { params });
  }
}
