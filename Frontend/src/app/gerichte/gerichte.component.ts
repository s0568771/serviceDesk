import {Component, OnInit} from '@angular/core';
import {Gericht} from './gericht.model';
import {DatePipe} from '@angular/common';
import {FavoriteService} from '../service/favorite.service';
import {DataStorageService} from '../service/data-storage.service';
import {GerichtService} from '../service/gericht.service';

@Component({
  selector: 'app-gerichte',
  templateUrl: './gerichte.component.html',
  styleUrls: ['./gerichte.component.css'],
  providers: [GerichtService]
})
export class GerichteComponent implements OnInit {
  public gerichte: Gericht[] = [];
  panelOpenState = false;
  mensaSelectedName: string = 'Hannover, Contine';
  mensaSelectedID: number = 7;
  date;
  keineGerichte: boolean;
  favoriteMensa;

  constructor(private gerichtService: GerichtService,
              private dataStorageService: DataStorageService,
              private favoriteService: FavoriteService,
              public datePipe: DatePipe) {
  }

  // this.datePipe.transform(this.date, 'yyyy-MM-dd')
  ngOnInit() {
    this.date = new Date();
    this.mensaSelectedID = parseInt(localStorage.getItem("mensaSelectedId"));
    this.mensaSelectedName = localStorage.getItem("mensaSelected");
    this.fetch(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));

    this.gerichtService.gerichteChanged.subscribe(
      (gerichte: Gericht[]) => {
        this.gerichte = gerichte;
        if (Array.isArray(this.gerichte) && this.gerichte.length) {
          //check ob der Array existiert und nicht leer ist
          this.keineGerichte = false;
        } else {
          this.keineGerichte = true;
        }
      });
    this.favoriteMensa = this.favoriteService.getFavorites();


  }

  fetch(id: number, date: string) {
    this.dataStorageService.fetchGerichte(id, date).subscribe(gericht => {
        this.gerichtService.setGerichte(gericht);
      }, (error => {
        //schmeißt HTTP error
        this.keineGerichte = true;
      })
    );
    this.keineGerichte = false;
  }

  dateForward() {
    this.date = new Date(this.date.setDate(this.date.getDate() + 1));
    this.fetch(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));
  }

  dateBack() {
    this.date = new Date(this.date.setDate(this.date.getDate() - 1));
    this.fetch(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));
  }

  useMensaSelected($event: any) {
    this.mensaSelectedName = $event.valueOf().name;
    this.mensaSelectedID = $event.valueOf().id;
    this.fetch(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    localStorage.setItem("mensaSelected",this.mensaSelectedName )
    localStorage.setItem("mensaSelectedId",this.mensaSelectedID.toString() )

    // neue API Anfrage, wenn eine Mensa ausgewählt wurde.
  }

  addFavorite() {
    this.favoriteService.addFavorites(this.mensaSelectedID, this.mensaSelectedName);
    this.favoriteMensa = this.favoriteService.getFavorites();
  }

   deleteFavorite() {
     this.favoriteService.deleteFavorite(this.mensaSelectedID);
     this.favoriteMensa = this.favoriteService.getFavorites();

   }


}
