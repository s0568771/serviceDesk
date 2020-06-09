export class Gericht {

  public name: string;
  public category: string;
  public prices : number[];
  public notes: string[]


  constructor(name: string, category: string, prices: number[], notes: string[]) {
    this.name = name;
    this.category = category;
    this.prices = prices;
    this.notes = notes;
  }
}
