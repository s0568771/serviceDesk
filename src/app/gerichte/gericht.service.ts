import {Gericht} from './gericht.model';
import {Injectable} from '@angular/core';

@Injectable()
export class GerichtService {

  private gerichte: Gericht[] = [new Gericht('Salatteller Spezial mit gekochtem Ei und Kidneybohnen',
    'Vorspeisen', [3.45, 3.8, null, 4.15],
    ['Eier',
      'vegetarisch',
      'grün (Ampel)'
    ])];

  getGerichte() {
    return this.gerichte.slice();
  }

  setGerichte(recipes: Gericht[]) {
    this.gerichte = recipes;
    console.log(this.gerichte)
  }
}

