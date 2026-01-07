"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
class Country {
    constructor(countryName, countryCode, population, demographics = {}) {
        this.countryName = countryName;
        this.countryCode = countryCode;
        this.population = population;
        this.demographics = demographics;
    }
}
exports.Country = Country;
