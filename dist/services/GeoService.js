"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoService = void 0;
const SingletonMW_1 = require("../middlewares/SingletonMW");
const GeoRepository_1 = require("../repositories/GeoRepository");
const ApiManager_1 = require("../utils/ApiManager");
const AppError_1 = require("../utils/AppError");
let GeoService = class GeoService {
    constructor() {
        this.repo = new GeoRepository_1.GeoRepository();
    }
    async getCityData(cityName) {
        // const cityData = await this.repo.findCity(cityName);
        // if (cityData) return cityData;
        const data = await ApiManager_1.ApiManager.get(`${process.env.GEONAMES_URL}/searchJSON?name=${cityName}&maxRows=1&username=${process.env.GEONAMES_USER}`);
        if (!data.geonames?.length) {
            throw new AppError_1.AppError(`City ${cityName} not found`, 404);
        }
        const cityData = {
            name: cityName,
            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng,
            country: data.geonames[0].countryName,
        };
        // await this.repo.saveCity(cityData);
        return cityData;
    }
    async getCountryPopulation(countryCode) {
        // const populationData = await this.repo.findPopulation(countryCode);
        // if (populationData) return populationData;
        const data = await ApiManager_1.ApiManager.get(`${process.env.WORLD_BANK_URL}/country/${countryCode}/indicator/SP.POP.TOTL?format=json`);
        if (!data[1]?.length) {
            throw new AppError_1.AppError(`Country ${countryCode} not found`, 404);
        }
        // Busca el último año con valor válido
        const latest = data[1].find((d) => d.value !== null);
        const populationData = {
            country: countryCode,
            population: latest.value,
            year: latest.date,
        };
        // await this.repo.savePopulation(populationData);
        return populationData;
    }
    async saveReport(report) {
        // await this.repo.saveReport(report);
    }
};
exports.GeoService = GeoService;
exports.GeoService = GeoService = __decorate([
    SingletonMW_1.Singleton
], GeoService);
