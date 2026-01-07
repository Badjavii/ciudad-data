"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
class City {
    constructor(name, lat, lng, countryCode) {
        this.name = name.toLowerCase();
        this.lat = lat;
        this.lng = lng;
        this.countryCode = countryCode;
        this.reports = [];
    }
    addReport(message) {
        this.reports.push({ message, date: new Date() });
    }
}
exports.City = City;
