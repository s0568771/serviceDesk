import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Gericht} from '../gericht.model';

@Component({
  selector: 'app-gerichte-item',
  templateUrl: './gerichte-item.component.html',
  styleUrls: ['./gerichte-item.component.css']

})
export class GerichteItemComponent implements OnInit {

  mehrInfo = false;
  @Input() gerichtItem: Gericht;
  info: string;

  constructor() {
  }

  ngOnInit(): void {
    this.mehrInfo = false;
    this.info = 'Mehr Infos';
  }

  mehrInfos() {
    if (this.mehrInfo) {
      this.mehrInfo = false;
      this.info = 'Mehr Infos';
    } else {
      this.mehrInfo = true;
      this.info = 'Weniger Infos';
    }
  }


}
