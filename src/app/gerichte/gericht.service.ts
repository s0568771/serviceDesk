import {Gericht} from './gericht.model';
import {Injectable} from '@angular/core';

@Injectable()
export class GerichtService {

  private gerichte: Gericht[] = [
    new Gericht(
      'Tasty Schnitzel', 1, 'Info wie geil das schmeckt',),
    new Gericht('A super-tasty Schnitzel - just awesome!', 3.42, 'Schmeckt noch geiler!'),
    new Gericht('Salat',1.20, 'Von Salat schrumpft der Bizeps!')
  ];


getGericht() {
  return this.gerichte.slice();
}
}

