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
  public panelOpenState = false;
  public mensaSelectedName: string;
  public mensaSelectedID: number;
  public date: Date;
  public keineGerichte: boolean;
  //Used to check if selected mensa is marked as favorite
  public favoriteMensa: any;

  constructor(private gerichtService: GerichtService,
              private dataStorageService: DataStorageService,
              private favoriteService: FavoriteService,
              public datePipe: DatePipe) {
  }

  // this.datePipe.transform(this.date, 'yyyy-MM-dd')
  ngOnInit() {
    this.date = new Date();
    //Default Mensa and ID
    this.mensaSelectedName = 'Hannover, Contine';
    this.mensaSelectedID = 7;
    //Get selected Mensa and id from locastroage
    if (localStorage.getItem('mensaSelectedId') && localStorage.getItem('mensaSelected')) {
      this.mensaSelectedID = parseInt(localStorage.getItem('mensaSelectedId'));
      this.mensaSelectedName = localStorage.getItem('mensaSelected');
    }
    //Get Gerichte
    this.fetchGerichte(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));

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

  //Get Gerichte from dataStorageService and set them in GerichteService
  fetchGerichte(id: number, date: string) {
    this.dataStorageService.fetchGerichte(id, date).subscribe(gericht => {
        this.gerichtService.setGerichte(gericht);
      }, (error => {
        //schmeißt HTTP error
        this.keineGerichte = true;
      })
    );
    //show gif
    this.keineGerichte = false;
  }

  //Go on day forward and fetch Gerichte
  dateForward() {
    this.date = new Date(this.date.setDate(this.date.getDate() + 1));
    this.fetchGerichte(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));
  }

  //Go on day backwards and fetch Gerichte
  dateBack() {
    this.date = new Date(this.date.setDate(this.date.getDate() - 1));
    this.fetchGerichte(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));
  }
  //New Mensa got selected -> Fetch Gerichte again
  useMensaSelected($event: any) {
    this.mensaSelectedName = $event.valueOf().name;
    this.mensaSelectedID = $event.valueOf().id;
    this.fetchGerichte(this.mensaSelectedID, this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    localStorage.setItem('mensaSelected', this.mensaSelectedName);
    localStorage.setItem('mensaSelectedId', this.mensaSelectedID.toString());

    // neue API Anfrage, wenn eine Mensa ausgewählt wurde.
  }
  //Add Mensa to favorites in FavoriteService
  addFavorite() {
    this.favoriteService.addFavorites(this.mensaSelectedID, this.mensaSelectedName);
    this.favoriteMensa = this.favoriteService.getFavorites();
  }
  //Delete Mensa from favorites in FavoriteService
  deleteFavorite() {
    this.favoriteService.deleteFavorite(this.mensaSelectedID);
    this.favoriteMensa = this.favoriteService.getFavorites();

  }


}
