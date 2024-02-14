import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';

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
    return of(data.GET_LOCATION_KEY);
  }

  getCurrentWeather(locationKey: string): Observable<any> {
    const endpoint = `/currentconditions/v1/${locationKey}`;
    const params = {
      apikey: this.apiKey,
    };

    return this.http.get(`${this.apiUrl}${endpoint}`, { params });
    return of(data.CURRENT_WEATHER)
  }

  get5DayForecast(locationKey: string): Observable<any> {
    const endpoint = `/forecasts/v1/daily/5day/${locationKey}`;
    const params = {
      apikey: this.apiKey,
    };

    return this.http.get(`${this.apiUrl}${endpoint}`, { params });
    return of(data.FORECAST);
  }
}

const data = {
  GET_LOCATION_KEY: [
    {
      Key: '215854',
      LocalizedName: 'Tel Aviv',
    },
  ],

  FORECAST: {
    DailyForecasts: [
      {
        Date: '2024-02-14T07:00:00+02:00',
        EpochDate: 1707886800,
        Temperature: {
          Minimum: {
            Value: 54,
            Unit: 'F',
            UnitType: 18,
          },
          Maximum: {
            Value: 64,
            Unit: 'F',
            UnitType: 18,
          },
        },
       Day: {
          "Icon": 13,
          "IconPhrase": "Mostly cloudy w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
      }
      },
      {
        Date: '2024-02-15T07:00:00+02:00',
        EpochDate: 1707973200,
        Temperature: {
          Minimum: {
            Value: 55,
            Unit: 'F',
            UnitType: 18,
          },
          Maximum: {
            Value: 66,
            Unit: 'F',
            UnitType: 18,
          },
        },
        Day: {
          "Icon": 13,
          "IconPhrase": "Mostly cloudy w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
      }
      },
      {
        Date: '2024-02-16T07:00:00+02:00',
        EpochDate: 1708059600,
        Temperature: {
          Minimum: {
            Value: 54,
            Unit: 'F',
            UnitType: 18,
          },
          Maximum: {
            Value: 61,
            Unit: 'F',
            UnitType: 18,
          },
        },
        Day: {
          "Icon": 13,
          "IconPhrase": "Mostly cloudy w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
      }
      },
      {
        Date: '2024-02-17T07:00:00+02:00',
        EpochDate: 1708146000,
        Temperature: {
          Minimum: {
            Value: 54,
            Unit: 'F',
            UnitType: 18,
          },
          Maximum: {
            Value: 63,
            Unit: 'F',
            UnitType: 18,
          },
        },
        Day: {
          "Icon": 13,
          "IconPhrase": "Mostly cloudy w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
      }
      },
      {
        Date: '2024-02-18T07:00:00+02:00',
        EpochDate: 1708232400,
        Temperature: {
          Minimum: {
            Value: 53,
            Unit: 'F',
            UnitType: 18,
          },
          Maximum: {
            Value: 64,
            Unit: 'F',
            UnitType: 18,
          },
        },
        Day: {
          "Icon": 13,
          "IconPhrase": "Mostly cloudy w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
      }
      },
    ],
  },

  CURRENT_WEATHER: [
    {
      LocalObservationDateTime: '2024-02-14T10:47:00+02:00',
      EpochTime: 1707900420,
      WeatherText: 'Mostly cloudy',
      WeatherIcon: 6,
      Temperature: {
        Metric: {
          Value: 17.5,
          Unit: 'C',
          UnitType: 17,
        },
        Imperial: {
          Value: 64,
          Unit: 'F',
          UnitType: 18,
        },
      },
    },
  ],
};
