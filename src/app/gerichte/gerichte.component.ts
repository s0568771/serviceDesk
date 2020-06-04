import {Component, OnInit} from '@angular/core';
import {Gericht} from './gericht.model';
import {GerichtService} from './gericht.service';

@Component({
  selector: 'app-gerichte',
  templateUrl: './gerichte.component.html',
  styleUrls: ['./gerichte.component.css'],
  providers: [GerichtService]
})
export class GerichteComponent implements OnInit {
  gerichte: Gericht[];

  constructor(private gerichtService: GerichtService) {
  }

  ngOnInit(): void {
    this.gerichte = this.gerichtService.getGericht();
  }

}
