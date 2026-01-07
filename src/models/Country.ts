export class Country {
  countryName: string;       
  countryCode: string;       
  population: number;     
  demographics: Record<string, any>; 

  constructor(countryName: string, countryCode: string, population: number, demographics: Record<string, any> = {}) {
    this.countryName = countryName;
    this.countryCode = countryCode;
    this.population = population;
    this.demographics = demographics;
  }
}
