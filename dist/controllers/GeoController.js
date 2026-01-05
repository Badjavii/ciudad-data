"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoController = void 0;
const GeoService_1 = require("../services/GeoService");
const SingletonMW_1 = require("../middlewares/SingletonMW");
let GeoController = class GeoController {
    constructor() {
        this.service = new GeoService_1.GeoService();
    }
    async getCity(req, res) {
        const cityName = req.params.city;
        const cityData = await this.service.getCityData(cityName);
        res.json(cityData);
    }
    async getPopulation(req, res) {
        const countryName = req.params.country;
        const populationData = await this.service.getCountryPopulation(countryName);
        res.json(populationData);
    }
    async createReport(req, res) {
        await this.service.saveReport(req.body);
        res.status(201).json({ message: "Report saved successfully" });
    }
};
exports.GeoController = GeoController;
exports.GeoController = GeoController = __decorate([
    SingletonMW_1.Singleton
], GeoController);
