import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {GerichtService} from './gericht.service';
import {Gericht, GerichteAdapter} from './gericht.model';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private gerichtService: GerichtService, private adapter: GerichteAdapter,private router: Router ) {
  }


  keineGerichte = new Subject<boolean>();
  gericht: Gericht[];


  fetchGerichte(id: number, date: string): Observable<Gericht[]> {
    return this.http.get('https://openmensa.org/api/v2/canteens/' + id + '/days/' + date + '/meals').pipe(
      map((data: any[]) => data.map((item) => this.adapter.adapt(item))),
      catchError(this.errorHandler)
    );
  };


  errorHandler(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status == 404) {
      }
    } else {
    }
    return throwError(error);
  }
}
