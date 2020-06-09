import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Gericht} from '../gericht.model';

@Component({
  selector: 'app-gerichte-item',
  templateUrl: './gerichte-item.component.html',
  styleUrls: ['./gerichte-item.component.css']

})
export class GerichteItemComponent implements OnInit, OnChanges {
  @Input() gericht: Gericht;

  mehrInfo = false;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['gericht'].currentValue);
  }
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
