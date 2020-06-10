import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Gericht} from './gericht.model';
import {GerichtService} from './gericht.service';
import {DataStorageService} from './data-storage.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-gerichte',
  templateUrl: './gerichte.component.html',
  styleUrls: ['./gerichte.component.css'],
  providers: [GerichtService]
})
export class GerichteComponent implements OnInit {
  public gerichte: Gericht[] = [];


  constructor(private gerichtService: GerichtService, private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.fetch(30, '2019-11-18');

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

  test() {
    console.log(this.gerichtService.getGerichte());
    console.log(this.gerichte);
  }
}
