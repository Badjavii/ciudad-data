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
const CityRepository_1 = require("../repositories/CityRepository");
const CountryRepository_1 = require("../repositories/CountryRepository");
const ApiManager_1 = require("../utils/ApiManager");
const AppError_1 = require("../utils/AppError");
let GeoService = class GeoService {
    constructor() {
        this.cityRepo = new CityRepository_1.CityRepository();
        this.countryRepo = new CountryRepository_1.CountryRepository();
    }
    /**
     * Obtiene datos de una ciudad.
     * Primero busca en Atlas (Cache), si no existe, consulta GeoNames.
     */
    async getCityData(cityName) {
        // 1. Intentar buscar en la base de datos local
        let city = await this.cityRepo.findByName(cityName);
        if (city)
            return city;
        // 2. Si no está, consultar la API externa
        city = await ApiManager_1.ApiManager.getCityData(cityName);
        if (!city) {
            throw new AppError_1.AppError(`City ${cityName} not found in external API`, 404);
        }
        // 3. Guardar en Atlas para futuras consultas
        await this.cityRepo.save(city);
        return city;
    }
    /**
     * Obtiene datos de un país.
     * Aplica la misma lógica de "Cache-aside" (DB primero, luego API).
     */
    async getCountryPopulation(countryCode) {
        let country = await this.countryRepo.findByCode(countryCode);
        if (country)
            return country;
        country = await ApiManager_1.ApiManager.getCountryData(countryCode);
        if (!country) {
            throw new AppError_1.AppError(`Country ${countryCode} not found`, 404);
        }
        await this.countryRepo.save(country);
        return country;
    }
    /**
     * Guarda un reporte ciudadano.
     */
    async saveReport(cityName, message) {
        // Obtenemos la ciudad (de la DB o la API)
        let city = await this.getCityData(cityName);
        // Usamos el método de la clase City para la lógica de negocio
        city.addReport(message);
        // Persistimos el cambio
        await this.cityRepo.save(city);
        return city;
    }
};
exports.GeoService = GeoService;
exports.GeoService = GeoService = __decorate([
    SingletonMW_1.Singleton
], GeoService);
