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

  //Get List of all mensen
  getMensen() {
    return this.http.get(this.apiUrl + '/mensen');
  }

  //Get single mensa
  getSingleMensa(id: number) {
    return this.http.get("https://openmensa.org/api/v2/canteens/" + id);
  }

  // Function für DB-Test, um alle Einträge zu löschen
  // private deleteAll(): void{
  //   const url = this.apiUrl + 'canteens/';
  //   this.http.get(url).subscribe((res) => {
  //     this.tempData = res;
  //     this.tempData.forEach(obj => {
  //       this.http.delete(url + obj._id).subscribe((res1) => {
  //       });
  //     });
  //   });
  // }


}
