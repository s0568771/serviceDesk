import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GerichtService} from './gericht.service';
import {Gericht, GerichteAdapter} from './gericht.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private gerichtService: GerichtService, private adapter: GerichteAdapter) {
  }

  gericht: Gericht[];

  fetchGerichte(): Observable<Gericht[]> {
    return this.http.get('https://openmensa.org/api/v2/canteens/30/days/2019-11-18/meals').pipe(
      map((data: any[]) => data.map((item) => this.adapter.adapt(item)))
    );

  };
}
