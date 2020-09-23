import {Component, OnInit} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {FavoriteService} from '../service/favorite.service';
import {DataStorageService} from '../service/data-storage.service';
import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-praeferenzen',
  templateUrl: './praeferenzen.component.html',
  styleUrls: ['./praeferenzen.component.css']
})
export class PraeferenzenComponent implements OnInit {
  favorite;
  removable: true;
  selectable: true;
  isChecked;

  readonly VAPID_PUBLIC_KEY = 'BKLkI8l4j8fAVwP6FrBKGXQtRwncyYNWq-NJyiMyfGHUSe2AEGp1jMLVpJsAdOq1qPP3Go2CuYMGAw7QDLCFi9k';

  constructor(private swPush: SwPush,
              private favoriteService: FavoriteService,
              private dataStorageService: DataStorageService,
              private datePipe: DatePipe,
              private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('checked')) {
      let json = JSON.parse(localStorage.getItem('checked'));
      this.isChecked = json.run;
      console.log(this.isChecked);
    } else {
      this.isChecked = false;
      console.log(this.isChecked);
    }
    this.favorite = this.favoriteService.getFavorites();
    this.favoriteService.favoriteMensaChanged.subscribe((e: string) => {
      this.favorite = JSON.parse(e);
    });

  }

  remove(e): void {
    this.favoriteService.deleteFavorite(e.key);
  }

  subscribeToNotifications() {
    if (!this.isChecked) {
      let e = {'run': 'false'};
      this.add(e).subscribe(e => console.log(e));
      console.log('testAusgestellt');
    } else {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(sub => {
          this.favoriteService.addPushSubscriber(sub).subscribe(e => console.log(e));
        })
        .catch(err => console.error('Could not subscribe to notifications', err));
      this.favoriteMe();
    }
  }


    favoriteMe() {

    let date = new Date();
    if (localStorage.getItem('favorite')) {
      if ((localStorage.getItem('favorite'))[0]) {
        var firstKey = Object.keys(JSON.parse(localStorage.getItem('favorite')))[0];
        var firstkeyInt = parseInt(firstKey);
      }
    }
    this.dataStorageService.fetchGerichte(firstkeyInt, this.datePipe.transform(date, 'yyyy-MM-dd'))
      .subscribe(e => {
        let jsonObject = {};
        e.forEach(item => jsonObject[item.name] = item.prices.students);
        let json = JSON.stringify(jsonObject);
        this.add(json).subscribe(e => 'Done');

      });
  }

  add(e) {
    const headers = {'content-type': 'application/json'};
    return this.http.post('http://localhost:4000/fave', e, {'headers': headers});
  }

  onChange($event: MatSlideToggleChange) {
    this.isChecked = $event.checked;
    if (this.isChecked) {
      let e = {'run': 'true'};
      localStorage.setItem('checked', JSON.stringify(e));
    } else {
      let e = {'run': 'false'};
      localStorage.setItem('checked', JSON.stringify(e));
    }
    this.subscribeToNotifications();
  }
}
