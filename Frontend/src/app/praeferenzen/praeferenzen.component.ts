import {Component, OnInit} from '@angular/core';
import {GerichtService} from '../gerichte/gericht.service';
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
  readonly VAPID_PUBLIC_KEY = 'BB2y8PMjh9Gjb_DUIejeNyFGiXumvojgL-MMB5TAscifkaifyBEPY4m4fSNZtN-Xa3ReW-4LUVxmbz-pYFIL65E';


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
    }).then(sub => console.log(JSON.stringify(sub))).catch(err => console.log(JSON.stringify(err)))
  }

}
