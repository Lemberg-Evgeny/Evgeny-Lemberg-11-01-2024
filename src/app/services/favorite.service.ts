import { Injectable } from '@angular/core';

export interface FavoriteLocation {
  locationKey: string;
  locationName: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favorites: FavoriteLocation[] = [];

  constructor() {}

  addToFavorites(location: FavoriteLocation): void {
    if (!this.isLocationInFavorites(location)) {
      this.favorites.push(location);
    }
  }

  removeFromFavorites(location: FavoriteLocation): void {
    const index = this.favorites.findIndex(
      (favorite) => favorite.locationKey === location.locationKey
    );
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  isLocationInFavorites(location: FavoriteLocation): boolean {
    return this.favorites.some(
      (favorite) => favorite.locationKey === location.locationKey
    );
  }

  getFavorites(): FavoriteLocation[] {
    return this.favorites.slice();
  }
}
