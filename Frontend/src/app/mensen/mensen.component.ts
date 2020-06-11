import {Component, OnInit} from '@angular/core';
import {MensaService} from './mensa.service';
import {Mensa} from './mensa.model';


@Component({
  selector: 'app-mensen',
  templateUrl: './mensen.component.html',
  styleUrls: ['./mensen.component.css']
})
export class MensenComponent implements OnInit {
  mensen: Mensa[] = [];


  diplayerdColums: string[] = ['id', 'name', 'city', 'address', 'coordinates'];

  constructor(private mensenService: MensaService) {
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
}
