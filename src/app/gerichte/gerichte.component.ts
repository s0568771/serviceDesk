import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Gericht} from './gericht.model';
import {GerichtService} from './gericht.service';
import {DataStorageService} from './data-storage.service';

@Component({
  selector: 'app-gerichte',
  templateUrl: './gerichte.component.html',
  styleUrls: ['./gerichte.component.css'],
  providers: [GerichtService]
})
export class GerichteComponent implements OnInit {
  gerichte: Gericht[];

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['gerichte'].currentValue);
  }
  constructor(private gerichtService: GerichtService, private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.gerichte = this.gerichtService.getGerichte();
  }

  fetch() {
    this.dataStorageService.fetchGerichte();
    this.gerichte = this.gerichtService.getGerichte();
  }

}
