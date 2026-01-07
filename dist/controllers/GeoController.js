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
const AppError_1 = require("../utils/AppError");
let GeoController = class GeoController {
    constructor() {
        this.service = new GeoService_1.GeoService();
    }
    /**
     * @swagger
     * /geo/city/{city}:
     *   get:
     *     summary: Obtener datos de una ciudad
     *     description: Devuelve información detallada de una ciudad.
     *     parameters:
     *       - in: path
     *         name: city
     *         required: true
     *         schema:
     *           type: string
     *         description: Nombre de la ciudad
     *     responses:
     *       200:
     *         description: Datos de la ciudad obtenidos correctamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/City'
     */
    async getCity(req, res) {
        try {
            const cityName = req.params.city;
            const city = await this.service.getCityData(cityName);
            res.json(city);
        }
        catch (err) {
            console.log("Error debug: ", err);
            const status = err instanceof AppError_1.AppError ? err.statusCode : 500;
            res.status(status).json({ error: err.message });
        }
    }
    /**
     * @swagger
     * /geo/country/{country}:
     *   get:
     *     summary: Obtener población de un país
     *     description: Devuelve datos de población para un país específico.
     *     parameters:
     *       - in: path
     *         name: country
     *         required: true
     *         schema:
     *           type: string
     *         description: "Código del país, por ejemplo VE"
     *     responses:
     *       200:
     *         description: Datos de población obtenidos correctamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Country'
     */
    async getPopulation(req, res) {
        try {
            const countryCode = req.params.country;
            const country = await this.service.getCountryPopulation(countryCode);
            res.json(country);
        }
        catch (err) {
            console.log("Error debug: ", err);
            const status = err instanceof AppError_1.AppError ? err.statusCode : 500;
            res.status(status).json({ error: err.message });
        }
    }
    /**
     * @swagger
     * /geo/report:
     *   post:
     *     summary: Crear un reporte para una ciudad
     *     description: Agrega un nuevo reporte a una ciudad y lo guarda en la base de datos.
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
     *         description: Ciudad actualizada con el nuevo reporte
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/City'
     */
    async createReport(req, res) {
        try {
            const { cityName, message } = req.body;
            const updatedCity = await this.service.saveReport(cityName, message);
            res.status(201).json({ message: "Report saved successfully" });
        }
        catch (err) {
            console.log("Error debug: ", err);
            const status = err instanceof AppError_1.AppError ? err.statusCode : 500;
            res.status(status).json({ error: err.message });
        }
    }
};
exports.GeoController = GeoController;
exports.GeoController = GeoController = __decorate([
    SingletonMW_1.Singleton
], GeoController);
