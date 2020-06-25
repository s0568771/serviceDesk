import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Gericht} from './gericht.model';
import {GerichtService} from './gericht.service';
import {DataStorageService} from './data-storage.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {Mensa} from '../mensen/mensa.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-gerichte',
  templateUrl: './gerichte.component.html',
  styleUrls: ['./gerichte.component.css'],
  providers: [GerichtService]
})
export class GerichteComponent implements OnInit {
  public gerichte: Gericht[] = [];
  panelOpenState = false;
  mensaSelectedName: String = 'Hannover, Contine';
  mensaSelectedID: number = 7;
  date = new Date();
  keineGerichte: boolean;
  favoriteMensa: String[] = [];


  constructor(private gerichtService: GerichtService, private dataStorageService: DataStorageService, public datePipe: DatePipe) {
  }

  // this.datePipe.transform(this.date, 'yyyy-MM-dd')
  ngOnInit() {
    this.fetch(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));

    this.gerichtService.gerichteChanged.subscribe(
      (gerichte: Gericht[]) => {
        this.gerichte = gerichte;
        if (Array.isArray(this.gerichte) && this.gerichte.length) {
          //check ob der Array existiert und nicht leer ist
          this.keineGerichte = false;
        } else {
          this.keineGerichte = true;
        }
      });
  }


  fetch(id: number, date: string) {
    this.dataStorageService.fetchGerichte(id, date).subscribe(gericht => {
        this.gerichtService.setGerichte(gericht);
      }, (error => {
        //schmeißt HTTP error
        this.keineGerichte = true;
      })
    );
    this.keineGerichte = false;
  }

  dateForward() {
    this.date = new Date(this.date.setDate(this.date.getDate() + 1));
    this.fetch(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));
  }

  dateBack() {
    this.date = new Date(this.date.setDate(this.date.getDate() - 1));
    this.fetch(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));
  }

  useMensaSelected($event: any) {
    this.mensaSelectedName = $event.valueOf().name;
    this.mensaSelectedID = $event.valueOf().id;
    this.fetch(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));

    // neue API Anfrage, wenn eine Mensa ausgewählt wurde.
  }

  addFavorite() {
    if (!this.favoriteMensa.includes(this.mensaSelectedName)) {
      this.favoriteMensa.push(this.mensaSelectedName);
    }
  }
  deleteFavorite() {
    this.favoriteMensa.splice(this.favoriteMensa.indexOf(this.mensaSelectedName), 1);
  }
}
