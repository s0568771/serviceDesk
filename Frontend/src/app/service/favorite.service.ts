import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DataStorageService} from './data-storage.service';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient,
              public datePipe: DatePipe) {

  }

  private favoriteMensa = {};
  public favoriteMensaChanged = new Subject();

  getFavorites() {
    this.favoriteMensa = JSON.parse(localStorage.getItem('favorite'));
    if (this.favoriteMensa) {
      return this.favoriteMensa;
    } else {
      return {};
    }
  }

  addFavorites(mensaID: number, mensaSelected: string) {
    this.favoriteMensa = this.getFavorites();
    this.favoriteMensa[mensaID] = mensaSelected;

    console.log(this.favoriteMensa);
    localStorage.setItem('favorite', JSON.stringify(this.favoriteMensa));
    this.favoriteMensaChanged.next(localStorage.getItem('favorite'));
  }

  deleteFavorite(mensaID: number) {
    this.favoriteMensa = this.getFavorites();
    if (mensaID in this.favoriteMensa) {
      delete this.favoriteMensa[mensaID];
    }
    this.favoriteMensaChanged.next(JSON.stringify(this.favoriteMensa));
    localStorage.setItem('favorite', JSON.stringify(this.favoriteMensa));

  }
  //Post Push Subscriber to the backend.
  addPushSubscriber(subscription: PushSubscription) {
    return this.http.post('http://localhost:4000/subscription', subscription);
  }
}
