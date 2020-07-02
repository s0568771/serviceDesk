import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favoriteMensa: String[] = [];
  favoriteMensaChanged = new Subject<String[]>();

  getFavorites() {
    this.favoriteMensa = JSON.parse(localStorage.getItem('favorite'));
    return this.favoriteMensa.slice();
  }

  addFavorites(menseaSelected: String) {
    if (!this.favoriteMensa.includes(menseaSelected)) {
      this.favoriteMensa.push(menseaSelected);

      this.favoriteMensaChanged.next(this.favoriteMensa.slice());
      localStorage.setItem('favorite', JSON.stringify(this.favoriteMensa));
    }
  }

  deleteFavorite(mensaSelectedName: String) {
    this.favoriteMensa.splice(this.favoriteMensa.indexOf(mensaSelectedName), 1);
    this.favoriteMensaChanged.next(this.favoriteMensa.slice());
    localStorage.setItem('favorite', JSON.stringify(this.favoriteMensa));

  }
}
