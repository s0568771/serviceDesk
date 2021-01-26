import {Component, OnInit} from '@angular/core';
import {MensaService} from '../service/mensa.service';
import {Mensa} from '../mensen/mensa.model';
import {DirectionService} from '../service/direction.service';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent implements OnInit {


  public panelOpenState: boolean;
  public mensaSelectedName: string;
  private mensaSelectedId: number;
  private mensa: Mensa;
  public lat: number;
  public lng: number;
  public origin: any;
  public destination: any;
  public zoom: number = 10;
  private userLat: number;
  private userlng: number;
  public suche: boolean = false;


  constructor(private mensaService: MensaService) {
  }

  ngOnInit(): void {
    //Get Name and Id from Localstorage
    if (localStorage.getItem('mensaSelected') && localStorage.getItem('mensaSelectedId')) {
      this.mensaSelectedName = localStorage.getItem('mensaSelected');
      this.mensaSelectedId = parseInt(localStorage.getItem('mensaSelectedId'));
    }
    //Get coordinates from selected mensa
    this.mensaService.getSingleMensa(this.mensaSelectedId).subscribe((mensa: Mensa) => {
      if (mensa) {
        this.mensa = mensa;
        if (mensa.coordinates.length == 2) {
          this.lat = mensa.coordinates[0];
          this.lng = mensa.coordinates[1];
        }
      }
    }, err  => console.log(err));
  }
  //event fired, when new mensa is selected and update coordinates
  useMensaSelected($event: any) {
    this.mensaSelectedName = $event.valueOf().name;
    this.mensaSelectedId = $event.valueOf().id;
    this.mensaService.getSingleMensa($event.valueOf().id).subscribe((mensa: Mensa) => {
      if (mensa) {
        this.mensa = mensa;
        if (mensa.coordinates.length == 2) {
          this.lat = mensa.coordinates[0];
          this.lng = mensa.coordinates[1];
          this.suche = false;
        }
      }
    });
  }
  //Filling google maps search with origin and selected mensa coordinates
  public getDirection() {
    this.suche = true;
    this.origin = {lat: this.userLat, lng: this.userlng};
    this.destination = {lat: this.lat, lng: this.lng};

  }
  //Gets current position from the user and start navigation
  findUser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLat = position.coords.latitude;
        this.userlng = position.coords.longitude;
        this.getDirection();
      },err  => console.log(err));
    } else {
      alert('Geolocation is not supported by this browser.');
    }

  }
}
