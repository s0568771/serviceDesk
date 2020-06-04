export class Gericht {

  public name: string;
  public preis: number;
  public beschreibung: string;

  constructor(name: string, preis: number, beschreibung: string) {
    this.name = name;
    this.preis = preis;
    this.beschreibung = beschreibung;
  }
}
