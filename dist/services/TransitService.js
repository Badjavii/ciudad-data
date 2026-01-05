"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitService = void 0;
const SingletonMW_1 = require("../middlewares/SingletonMW");
const TransitRepository_1 = require("../repositories/TransitRepository");
const ApiManager_1 = require("../utils/ApiManager");
const AppError_1 = require("../utils/AppError");
let TransitService = class TransitService {
    constructor() {
        this.repo = new TransitRepository_1.TransitRepository();
    }
    async getRoutes(cityName) {
        // const routes = await this.repo.findRoutes(cityName);
        // if (routes?.length) return routes;
        const data = await ApiManager_1.ApiManager.get(`https://api.transitdata.com/routes?city=${cityName}`);
        if (!data.routes?.length) {
            throw new AppError_1.AppError(`No routes found for city ${cityName}`, 404);
        }
        const routes = data.routes.map((r) => ({
            id: r.id,
            name: r.name,
            stops: r.stops,
        }));
        // await this.repo.saveRoutes(cityName, routes);
        return routes;
    }
    async getETA(stopId) {
        // const eta = await this.repo.findETA(stopId);
        // if (eta) return eta;
        const data = await ApiManager_1.ApiManager.get(`https://api.transitdata.com/eta?stop_id=${stopId}`);
        if (!data.eta) {
            throw new AppError_1.AppError(`No ETA found for stop ${stopId}`, 404);
        }
        const eta = { stopId, arrivalTime: data.eta };
        // await this.repo.saveETA(eta);
        return eta;
    }
    async reportIncident(incident) {
        // await this.repo.saveIncident(incident);
    }
};
exports.TransitService = TransitService;
exports.TransitService = TransitService = __decorate([
    SingletonMW_1.Singleton
], TransitService);
