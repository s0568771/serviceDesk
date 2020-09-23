import {Component, OnInit} from '@angular/core';
import {GerichteComponent} from '../gerichte/gerichte.component';
import {MensaService} from '../service/mensa.service';
import {Mensa} from '../mensen/mensa.model';
import {DirectionService} from '../service/direction.service';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.css']
})
export class DirectionComponent implements OnInit {
  panelOpenState: boolean;
  mensaSelectedName: any;
  mensaSelectedId: any;
  private mensaSelectedID: any;
  private mensa: Mensa;
  lat: number;
  lng: number;
  public origin: any;
  public destination: any;
  zoom = 10;
  private userLat = 52.4779079;
  private userlng = 13.494145000000001;
  suche: boolean = false;


  constructor(private mensaService: MensaService,
              private directionService: DirectionService) {
  }

  ngOnInit(): void {
    this.mensaSelectedName = localStorage.getItem('mensaSelected');
    this.mensaSelectedId = localStorage.getItem('mensaSelectedId');

    this.mensaService.getSingleMensa( this.mensaSelectedId).subscribe((mensa: Mensa) => {
      if (mensa) {
        this.mensa = mensa;
        if(mensa.coordinates.length==2){
          this.lat = mensa.coordinates[0];
          this.lng = mensa.coordinates[1]
        }
      }
    });
  }

  useMensaSelected($event: any) {
    this.mensaSelectedName = $event.valueOf().name;
    this.mensaSelectedID = $event.valueOf().id;
  }


  public getDirection() {
    this.suche = true;
    this.origin = {lat: this.userLat, lng: this.userlng};
    this.destination = {lat: this.lat, lng: this.lng};

  }
  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
       console.log(position.coords)
        this.userLat = position.coords.latitude
        this.userlng = position.coords.longitude
        console.log(this.userLat)
        console.log(this.userlng)

      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    this.getDirection();
  }
}
