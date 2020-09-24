import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  constructor(private http: HttpClient) {

  }
  //Not used yet
  //TODO: Implement near mensa api
  getNearMensa(lat: number, lng: number) {
    return this.http.get('https://openmensa.org/api/v2/canteens?near[lat]=' + lat + '&near[lng]=' +
      lng);

  }
}
