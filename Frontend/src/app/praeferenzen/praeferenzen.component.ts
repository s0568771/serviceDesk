import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../gerichte/favorite.service';
import {SwPush} from '@angular/service-worker';

@Component({
  selector: 'app-praeferenzen',
  templateUrl: './praeferenzen.component.html',
  styleUrls: ['./praeferenzen.component.css']
})
export class PraeferenzenComponent implements OnInit {
  favorite = [];
  removable: true;
  selectable: true;
  isChecked = true;

  readonly VAPID_PUBLIC_KEY = "BKLkI8l4j8fAVwP6FrBKGXQtRwncyYNWq-NJyiMyfGHUSe2AEGp1jMLVpJsAdOq1qPP3Go2CuYMGAw7QDLCFi9k";

  constructor(private swPush: SwPush,
              private favoriteService: FavoriteService) {
  }

  ngOnInit(): void {
    this.favorite = this.favoriteService.getFavorites();
    this.favoriteService.favoriteMensaChanged.subscribe((e: String[]) => {
      this.favorite = e;
    });
  }

  remove(e): void {
    this.favoriteService.deleteFavorite(e);

  }
  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => console.log(JSON.stringify(sub)))
      .catch(err => console.error("Could not subscribe to notifications", err));
  }


}
