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
    this.gerichtService.gerichteChanged.subscribe(
      (gerichte: Gericht[]) => {
        this.gerichte = gerichte;
      });
  }
  fetch() {
    this.dataStorageService.fetchGerichte().subscribe(gericht => {
        this.gerichtService.setGerichte(gericht)
    }

    );
  }
  test() {
    console.log(this.gerichtService.getGerichte())
    console.log(this.gerichte)
  }
}
