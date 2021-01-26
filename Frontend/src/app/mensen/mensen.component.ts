import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Mensa} from './mensa.model';
import {DataStorageService} from '../service/data-storage.service';
import {MensaService} from '../service/mensa.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-mensen',
  templateUrl: './mensen.component.html',
  styleUrls: ['./mensen.component.css']
})
export class MensenComponent implements OnInit {
  public mensen: Mensa[] = [];
  private tempData: any = [];

  //Pass slected Mensa to Gerichte Component
  @Output() mensaSelected: EventEmitter<any> = new EventEmitter<any>();
  private mensa: Mensa;


  constructor(private http: HttpClient,
              private mensenService: MensaService,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.deleteAll(); // löscht alle aus der DB
    this.saveMensen(); // Fügt alle Mensen aus openMensa zur DB hinzu
    this.fetchMensen(); // fetch data
  }

  //Fetch Mensa from mensaService. Result is Mapped to Model (Mensa)
  fetchMensen() {
    this.mensenService.getMensen().
    subscribe((data: Mensa[]) => {
      if (data){
      this.mensen = data;
      }
    }), error => console.log('Mensaerror',error);
  }
  //Emit when mensa is changed.
  onMensaSelectedChange(mensa) {
    this.mensa = mensa;
    this.mensaSelected.emit(this.mensa);

  }

  private saveMensen(): void {
    const url = 'https://openmensa.org/api/v2/canteens';
    this.http.get(url).subscribe((res) => {
      if (res !== null) {
        console.log(res);
        this.patchCanteens(res);
      }
    });
  }

  private patchCanteens(data): void {
    console.log('patchCanteens')
    const url = 'http://localhost:4000/mensen/';
    data.forEach(obj => {
      console.log(obj.id);
      this.http.get(url + obj.id).subscribe((res) => {
        console.log(res);
        if (Object.keys(res).length === 0) {  // Objekt mit :id ist nicht in DB, somit hinzufügen
          this.canteenToDB(obj);
        }
      });
    });
  }

  private canteenToDB(data): void {
    console.log('canteenDB');
    console.log(data);
    this.http.post('http://localhost:4000/mensen/', data).subscribe((res) => {
    });
  }

  // Function für DB-Test, um alle Einträge zu löschen
  private deleteAll(): void{
    const url = 'http://localhost:4000/mensen/';
    this.http.get(url).subscribe((res) => {
      this.tempData = res;
      this.tempData.forEach(obj => {
        this.http.delete(url + obj._id).subscribe((res1) => {
        });
      });
    });
  }
}
