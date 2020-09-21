import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensaService {

  constructor(private http: HttpClient) {
  }

  apiUrl = environment.apiUrl;

  getMensen() {
    return this.http.get(this.apiUrl + '/mensen');
  }

}
