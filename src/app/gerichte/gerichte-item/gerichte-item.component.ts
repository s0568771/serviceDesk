import {Component, Input, OnInit} from '@angular/core';
import {Gericht} from '../gericht.model';

@Component({
  selector: 'app-gerichte-item',
  templateUrl: './gerichte-item.component.html',
  styleUrls: ['./gerichte-item.component.css']
})
export class GerichteItemComponent implements OnInit {
  @Input() gericht: Gericht;

  mehrInfo = false;

  constructor() {
  }

  ngOnInit(): void {
    this.mehrInfo = false;

  }

  mehrInfos() {
    this.mehrInfo = true;
  }

  mehrInfosClear() {
    this.mehrInfo = false;
  }
}
