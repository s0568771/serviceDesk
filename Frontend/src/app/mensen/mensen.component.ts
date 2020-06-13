import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MensaService} from './mensa.service';
import {Mensa} from './mensa.model';


@Component({
  selector: 'app-mensen',
  templateUrl: './mensen.component.html',
  styleUrls: ['./mensen.component.css']
})
export class MensenComponent implements OnInit {
  mensen: Mensa[] = [];
  @Output() mensaSelected: EventEmitter<String> = new EventEmitter<String>();
  mensa;

  diplayerdColums: string[] = ['id', 'name', 'city', 'address'];

  constructor(private mensenService: MensaService) {
  }

  selectedOption: String;

  ngOnInit() {
    this.fetchMensen();


  }

  onNgModelChange($event) {
    this.selectedOption = $event;
  }

  fetchMensen() {
    this.mensenService.getMensen().subscribe((data: Mensa[]) => {
      this.mensen = data;
      console.log(this.mensen);
    });
  }

  onAreaListControlChanged(mensa) {
    this.mensa = mensa.name;
    this.mensaSelected.emit(this.mensa);

  }
}
