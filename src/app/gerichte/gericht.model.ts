import {Injectable} from '@angular/core';
import {Adapter} from './adapter';

export class Gericht {

  constructor(
    public id: number,
    public name: string,
    public category: string,
    public prices: Preis,
    public notes: string[],
  ) {
  }
}

export class Preis {
  constructor(
    public students: number,
    public employees: number,
    public pupils: number,
    public others: number,
  ) {
  }
}

@Injectable({
  providedIn: 'root',
})


export class GerichteAdapter implements Adapter<Gericht> {
  adapt(item: any): Gericht {

    var preis = item.prices;

    return new Gericht(item.id, item.name, item.category, new Preis(preis.students, preis.employees, preis.pupils, preis.others), item.notes);

  }
}


