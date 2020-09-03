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


}
