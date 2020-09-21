import {Component, OnInit} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {FavoriteService} from '../service/favorite.service';
import {DataStorageService} from '../service/data-storage.service';
import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-praeferenzen',
  templateUrl: './praeferenzen.component.html',
  styleUrls: ['./praeferenzen.component.css']
})
export class PraeferenzenComponent implements OnInit {
  favorite;
  removable: true;
  selectable: true;
  isChecked = true;

  readonly VAPID_PUBLIC_KEY = 'BKLkI8l4j8fAVwP6FrBKGXQtRwncyYNWq-NJyiMyfGHUSe2AEGp1jMLVpJsAdOq1qPP3Go2CuYMGAw7QDLCFi9k';

  constructor(private swPush: SwPush,
              private favoriteService: FavoriteService,
              private dataStorageService: DataStorageService,
              private datePipe: DatePipe,
              private http: HttpClient
               ) {
  }

  ngOnInit(): void {
    this.favorite = this.favoriteService.getFavorites();
    this.favoriteService.favoriteMensaChanged.subscribe((e: string) => {
      this.favorite = JSON.parse(e);
    });
    console.log(this.favorite);

  }

  remove(e): void {
    this.favoriteService.deleteFavorite(e.key);
  }
  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        this.favoriteService.addPushSubscriber(sub).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  favoriteMe() {

      let date = new Date()
      var firstKey = Object.keys(JSON.parse(localStorage.getItem('favorite')))[0];
      var firstkeyInt = parseInt(firstKey);
      this.dataStorageService.fetchGerichte(firstkeyInt,this.datePipe.transform(date, 'yyyy-MM-dd'))
        .subscribe(e =>  {
          let jsonObject = {}
          e.forEach(item => jsonObject[item.name] = item.prices.students)
          let json = JSON.stringify(jsonObject)
          console.log(json)
          this.add(json).subscribe(e => console.log(e))

    })
  }

  add(e) {
    const headers = { 'content-type': 'application/json'}
    return this.http.post("http://localhost:4000/fave",e,{"headers":headers});
  }
}
