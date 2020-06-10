import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Gericht} from '../gericht.model';
import {BehaviorSubject} from 'rxjs';
import {GerichtService} from '../gericht.service';

@Component({
  selector: 'app-gerichte-item',
  templateUrl: './gerichte-item.component.html',
  styleUrls: ['./gerichte-item.component.css']

})
export class GerichteItemComponent implements OnInit {

  mehrInfo = false;
  @Input() gerichtItem: Gericht;


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
