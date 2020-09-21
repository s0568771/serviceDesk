import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Mensa} from './mensa.model';
import {DataStorageService} from '../service/data-storage.service';
import {MensaService} from '../service/mensa.service';


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
    this.mensenService.getMensen().
    subscribe((data: Mensa[]) => {
      if (data){
      this.mensen = data;
      }
    }),
      error => console.log('Mensaerror',error);
  }

  onAreaListControlChanged(mensa) {
    this.mensa = mensa;
    this.mensaSelected.emit(this.mensa);

  }
}
