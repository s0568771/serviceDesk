import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensaService {

  constructor(private http: HttpClient) {
  }

  path = 'http://localhost:4000';

  getMensen() {
    return this.http.get(this.path + '/mensen');
  }

}
