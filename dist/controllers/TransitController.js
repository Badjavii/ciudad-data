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
const AppError_1 = require("../utils/AppError");
let TransitController = class TransitController {
    constructor() {
        this.service = new TransitService_1.TransitService();
    }
    /**
     * @swagger
     * /transit/routes/{city}:
     *   get:
     *     summary: Obtener rutas de transporte público
     *     description: Devuelve todas las rutas de transporte disponibles en una ciudad (NYC o London).
     *     parameters:
     *       - in: path
     *         name: city
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Lista de rutas de la ciudad
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/TransitCity'
     */
    async getRoutes(req, res) {
        try {
            const cityName = req.params.city;
            const city = await this.service.getRoutes(cityName);
            res.json(city);
        }
        catch (err) {
            const status = err instanceof AppError_1.AppError ? err.statusCode : 500;
            res.status(status).json({ error: err.message });
        }
    }
    /**
     * @swagger
     * /transit/eta:
     *   get:
     *     summary: Obtener ETA de una parada
     *     description: Devuelve la próxima unidad de transporte público que llegará a una parada específica.
     *     parameters:
     *       - in: query
     *         name: stop_id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Próxima unidad con ETA
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/TransitUnit'
     */
    async getETA(req, res) {
        try {
            const stopId = req.query.stop_id;
            const unit = await this.service.getETA(stopId);
            res.json(unit);
        }
        catch (err) {
            const status = err instanceof AppError_1.AppError ? err.statusCode : 500;
            res.status(status).json({ error: err.message });
        }
    }
    /**
     * @swagger
     * /transit/incident:
     *   post:
     *     summary: Reportar un incidente de transporte
     *     description: Permite a los ciudadanos reportar incidentes de transporte (retrasos, fallas, etc).
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               cityName:
     *                 type: string
     *               message:
     *                 type: string
     *     responses:
     *       201:
     *         description: Incidente reportado exitosamente
     */
    async reportIncident(req, res) {
        try {
            const { cityName, message } = req.body;
            await this.service.reportIncident(cityName, message);
            res.status(201).json({ message: "Incident reported successfully" });
        }
        catch (err) {
            const status = err instanceof AppError_1.AppError ? err.statusCode : 500;
            res.status(status).json({ error: err.message });
        }
    }
};
exports.TransitController = TransitController;
exports.TransitController = TransitController = __decorate([
    SingletonMW_1.Singleton
], TransitController);
