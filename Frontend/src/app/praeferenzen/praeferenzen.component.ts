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
  public favorite: any;
  public removable: boolean = true;
  public selectable: boolean = true;
  public isChecked: boolean;
  private firstkeyInt: number;

  readonly VAPID_PUBLIC_KEY = 'BKLkI8l4j8fAVwP6FrBKGXQtRwncyYNWq-NJyiMyfGHUSe2AEGp1jMLVpJsAdOq1qPP3Go2CuYMGAw7QDLCFi9k';

  constructor(private swPush: SwPush,
              private favoriteService: FavoriteService,
              private dataStorageService: DataStorageService,
              private datePipe: DatePipe,
              private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    //If user checked notification before
    if (localStorage.getItem('checked')) {
      let json = JSON.parse(localStorage.getItem('checked'));
      this.isChecked = json.run;
    } else {
      this.isChecked = false;
    }

    this.favorite = this.favoriteService.getFavorites();
    //Get favorite Mensa from service
    this.favoriteService.favoriteMensaChanged.subscribe((favoriteMensa: string) => {
      this.favorite = JSON.parse(favoriteMensa);
    });

  }
  //Remove favorite Mensa with key
  remove(mensa): void {
    this.favoriteService.deleteFavorite(mensa.key);
  }
  //Method for notification subscription.
  subscribeToNotifications() {
    //if !checked Push notification will be stopped
    if (!this.isChecked) {
      let e = {'run': 'false'};
      this.stopoOrRunNotification(e).subscribe(e => console.log(e));
      console.log('testAusgestellt');
    } else {
      //Request Subscription -> if sub handle sub in favorite service
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(sub => {
          this.favoriteService.addPushSubscriber(sub).subscribe(e => console.log(e));
        })
        .catch(err => console.error('Could not subscribe to notifications', err));
      //Get Data for Notifaction (Body of notification filled with daily Gerichte)
      this.getFavoriteMeals();
    }
  }

    //Get favorite Meals for selected Mensen
    //TODO: Add dynamic meals for each day. Maybe fetch Gerichte from backend with Cron-job?
    getFavoriteMeals() {
    //Current Date
    let date = new Date();
    //Get Favorite Mensa etc.
    if (localStorage.getItem('favorite')) {
      if ((localStorage.getItem('favorite'))[0]) {
        let firstKey = Object.keys(JSON.parse(localStorage.getItem('favorite')))[0];
         this.firstkeyInt = parseInt(firstKey);
      }
    }
    //Actual fetch of Gerichte
    this.dataStorageService.fetchGerichte(this.firstkeyInt, this.datePipe.transform(date, 'yyyy-MM-dd'))
      .subscribe(e => {
        let jsonObject = {};
        e.forEach(item => jsonObject[item.name] = item.prices.students);
        let json = JSON.stringify(jsonObject);
        this.stopoOrRunNotification(json).subscribe(e => 'Done');

      });
  }
  //Method to send meal daten from selected mensa to backend
  stopoOrRunNotification(e) {
    const headers = {'content-type': 'application/json'};
    return this.http.post('http://localhost:4000/submeals', e, {'headers': headers});
  }
  //Method for slider -> checked or not
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
