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
        let data;
        let routes;
        if (cityName.toUpperCase() === "NYC") {
            data = await ApiManager_1.ApiManager.get(`${process.env.MTA_API_URL}?key=${process.env.MTA_API_KEY}&VehicleMonitoringDetailLevel=calls`);
            console.log(JSON.stringify(data, null, 2));
            const activities = data.Siri?.ServiceDelivery?.VehicleMonitoringDelivery?.VehicleActivity || [];
            routes = activities.map((act) => ({
                lineRef: act.MonitoredVehicleJourney.LineRef,
                direction: act.MonitoredVehicleJourney.DirectionRef,
                stop: act.MonitoredVehicleJourney.MonitoredCall?.StopPointName,
                expectedArrival: act.MonitoredVehicleJourney.MonitoredCall?.ExpectedArrivalTime,
            }));
        }
        else if (cityName.toUpperCase() === "LONDON") {
            data = await ApiManager_1.ApiManager.get(`${process.env.TFL_API_URL}/Line/Mode/bus?app_key=${process.env.TFL_API_KEY}`);
            routes = data.map((line) => ({
                id: line.id,
                name: line.name,
                mode: line.modeName
            }));
        }
        else {
            throw new AppError_1.AppError(`No routes available for city ${cityName}`, 404);
        }
        // await this.repo.saveRoutes(cityName, routes);
        return routes;
    }
    async getETA(stopId) {
        // const eta = await this.repo.findETA(stopId);
        // if (eta) return eta;
        const data = await ApiManager_1.ApiManager.get(`${process.env.MTA_API_URL}?key=${process.env.MTA_API_KEY}&MonitoringRef=${stopId}`);
        if (!data) {
            throw new AppError_1.AppError(`No ETA found for stop ${stopId}`, 404);
        }
        const calls = data.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0]?.MonitoredStopVisit || [];
        const etaList = calls.map((visit) => ({
            line: visit.MonitoredVehicleJourney.LineRef,
            busId: visit.MonitoredVehicleJourney.VehicleRef,
            stop: visit.MonitoredVehicleJourney.MonitoredCall.StopPointName,
            expectedArrival: visit.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime,
            distance: visit.MonitoredVehicleJourney.MonitoredCall.Extensions?.Distances?.PresentableDistance,
            location: visit.MonitoredVehicleJourney.VehicleLocation,
        }));
        const eta = { stopId, eta: etaList };
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
