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
  mensaSelectedName: String;
  mensaSelectedID: number;
  date = new Date();
  keineGerichte: boolean;
  GerichteLoaded: Promise<boolean>;


  constructor(private gerichtService: GerichtService, private dataStorageService: DataStorageService, public datePipe: DatePipe) {
  }

  // this.datePipe.transform(this.date, 'yyyy-MM-dd')
  ngOnInit() {
    this.gerichtService.gerichteChanged.subscribe(
      (gerichte: Gericht[]) => {
        this.gerichte = gerichte;
      });
    this.dataStorageService.keineGerichte.subscribe(
      (keineGerichte) => {
        this.keineGerichte = keineGerichte.valueOf();
      });
  }


  fetch(id: number, date: string) {
    this.dataStorageService.fetchGerichte(id, date).subscribe(gericht => {
        console.log(gericht);
        this.gerichtService.setGerichte(gericht);
      this.GerichteLoaded = Promise.resolve(true);
      }, (error => {
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

  doSomething($event: any) {
    this.mensaSelectedName = $event.valueOf().name;
    this.mensaSelectedID = $event.valueOf().id;
    this.fetch(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    console.log(this.gerichte);
  }
}
