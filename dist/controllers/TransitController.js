"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitController = void 0;
const TransitService_1 = require("../services/TransitService");
const SingletonMW_1 = require("../middlewares/SingletonMW");
let TransitController = class TransitController {
    constructor() {
        this.service = new TransitService_1.TransitService();
    }
    async getRoutes(req, res) {
        const cityName = req.params.city;
        const routes = await this.service.getRoutes(cityName);
        res.json(routes);
    }
    async getETA(req, res) {
        const stopId = req.query.stop_id;
        const eta = await this.service.getETA(stopId);
        res.json({ stop_id: stopId, eta });
    }
    async reportIncident(req, res) {
        await this.service.reportIncident(req.body);
        res.status(201).json({ message: "Incident reported successfully" });
    }
};
exports.TransitController = TransitController;
exports.TransitController = TransitController = __decorate([
    SingletonMW_1.Singleton
], TransitController);
