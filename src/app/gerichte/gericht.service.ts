import {Gericht} from './gericht.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class GerichtService {

  private gerichte: Gericht[] = [];

  gerichteChanged = new Subject<Gericht[]>();

  getGerichte() {
    return this.gerichte.slice();
  }

  setGerichte(gericht: Gericht[]) {
    this.gerichte = gericht;
    this.gerichteChanged.next(this.gerichte.slice())
  }


}

