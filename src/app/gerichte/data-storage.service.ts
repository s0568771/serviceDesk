import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {GerichtService} from './gericht.service';
import {Gericht, GerichteAdapter} from './gericht.model';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private gerichtService: GerichtService, private adapter: GerichteAdapter) {
  }


  gericht: Gericht[];

  fetchGerichte(id: number, date: string): Observable<Gericht[]> {
    return this.http.get('https://openmensa.org/api/v2/canteens/' + id + '/days/' + date + '/meals').pipe(
      map((data: any[]) => data.map((item) => this.adapter.adapt(item))),
      catchError(this.errorHandler)
    );


  };
  errorHandler(err){
    if (err instanceof  HttpErrorResponse){
       if (err.status == 404){
         console.log("Fehler!! 404")
       }
    }else{

    }
    return throwError(err);
  }
}
