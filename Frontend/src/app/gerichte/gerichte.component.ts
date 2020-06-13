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
  mensaSelected: String;
  date = new Date();
  constructor(private gerichtService: GerichtService, private dataStorageService: DataStorageService, public datePipe: DatePipe) {
  }

  ngOnInit() {
    this.fetch(30, this.datePipe.transform(this.date, 'yyyy-MM-dd')); //'2019-11-18'
    console.log(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    this.gerichtService.gerichteChanged.subscribe(
      (gerichte: Gericht[]) => {
        this.gerichte = gerichte;
      });
  }


  fetch(id: number, date: string) {
    this.dataStorageService.fetchGerichte(id, date).subscribe(gericht => {
        this.gerichtService.setGerichte(gericht);
      }
    );
  }

  dateForward() {
    this.date = new Date(this.date.setDate(this.date.getDate() + 1));
  }
  dateBack() {
    this.date = new Date(this.date.setDate(this.date.getDate() - 1));
  }

  doSomething($event: any) {
    this.mensaSelected = $event.valueOf();
    console.log(this.mensaSelected)
  }
}
