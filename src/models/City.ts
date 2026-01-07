export class City {
  name: string;              
  lat: number;               
  lng: number;               
  countryCode: string;       
  reports: { message: string; date: Date }[];

  constructor(name: string, lat: number, lng: number, countryCode: string) {
    this.name = name.toLowerCase();
    this.lat = lat;
    this.lng = lng;
    this.countryCode = countryCode;
    this.reports = [];
  }

  addReport(message: string) {
    this.reports.push({ message, date: new Date() });
  }
}
