import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {GerichtService} from './gericht.service';
import {catchError, map} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Gericht, GerichteAdapter} from '../gerichte/gericht.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private gerichtService: GerichtService, private adapter: GerichteAdapter,private router: Router ) {
  }

  //Fetch Gerichte and map them to Gericht model
  fetchGerichte(id: number, date: string): Observable<Gericht[]> {
    return this.http.get('https://openmensa.org/api/v2/canteens/' + id + '/days/' + date + '/meals').pipe(
      map((data: any[]) => data.map((item) => this.adapter.adapt(item))),
      catchError(this.errorHandler)
    );
  };
  //handel http error
  errorHandler(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status == 404) {
      }
    } else {
    }
    return throwError(error);
  }
}
