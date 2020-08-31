import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MensaService} from './mensa.service';
import {Mensa} from './mensa.model';
import {DataStorageService} from '../gerichte/data-storage.service';


@Component({
  selector: 'app-mensen',
  templateUrl: './mensen.component.html',
  styleUrls: ['./mensen.component.css']
})
export class MensenComponent implements OnInit {
  mensen: Mensa[] = [];
  @Output() mensaSelected: EventEmitter<any> = new EventEmitter<any>();
  mensa;

  constructor(private mensenService: MensaService, private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.fetchMensen();
  }

  fetchMensen() {
    this.mensenService.getMensen().subscribe((data: Mensa[]) => {
      this.mensen = data;
      console.log(this.mensen);
    });
  }

  onAreaListControlChanged(mensa) {
    this.mensa = mensa;
    this.mensaSelected.emit(this.mensa);

  }
}
