import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GerichtService} from './gericht.service';
import {Gericht} from './gericht.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private gerichtService: GerichtService) {
  }

  fetchGerichte(){
    this.http.get<Gericht[]>('https://openmensa.org/api/v2/canteens/30/days/2019-11-18/meals').subscribe(gerichte => {
      this.gerichtService.setGerichte(gerichte);
    })
  }
}
