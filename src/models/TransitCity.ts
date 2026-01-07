import { TransitUnit } from "./TransitUnit";

export class TransitCity {
  name: string;             
  routes: TransitUnit[];   

  constructor(name: string) {
    this.name = name;
    this.routes = [];
  }

  addUnit(unit: TransitUnit) {
    this.routes.push(unit);
  }
}

