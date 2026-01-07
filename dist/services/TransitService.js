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
const TransitCityRepository_1 = require("../repositories/TransitCityRepository");
const TransitUnitRepository_1 = require("../repositories/TransitUnitRepository");
const CityRepository_1 = require("../repositories/CityRepository");
const ApiManager_1 = require("../utils/ApiManager");
const AppError_1 = require("../utils/AppError");
let TransitService = class TransitService {
    constructor() {
        this.cityRepo = new TransitCityRepository_1.TransitCityRepository();
        this.unitRepo = new TransitUnitRepository_1.TransitUnitRepository();
    }
    /**
     * Obtiene rutas de transporte.
     * Busca en Atlas (con populate) o consulta API externa si no existe.
     */
    async getRoutes(cityName) {
        // 1. Intentar buscar en DB (incluyendo los datos de las unidades conectadas)
        let cityDoc = await this.cityRepo.findByNameWithRoutes(cityName);
        if (cityDoc)
            return cityDoc;
        // 2. Si no está, consultar API externa
        const cityEntity = await ApiManager_1.ApiManager.getCityRoutes(cityName);
        if (!cityEntity) {
            throw new AppError_1.AppError(`No routes available for city ${cityName}`, 404);
        }
        // 3. Persistencia Compleja:
        // Primero guardamos cada TransitUnit y obtenemos sus IDs de MongoDB
        const savedUnitIds = [];
        for (const unit of cityEntity.routes) {
            const savedUnit = await this.unitRepo.save(unit);
            savedUnitIds.push(savedUnit._id.toString());
        }
        // 4. Guardamos la TransitCity con los IDs de las rutas
        return await this.cityRepo.save(cityEntity, savedUnitIds);
    }
    /**
     * Obtiene el ETA de una parada.
     * Aquí el dato de tiempo real suele venir siempre de la API,
     * pero lo guardamos en DB para historial/caché rápido.
     */
    async getETA(stopId) {
        // Consultamos tiempo real
        const unit = await ApiManager_1.ApiManager.getETA(stopId);
        if (!unit) {
            throw new AppError_1.AppError(`No ETA found for stop ${stopId}`, 404);
        }
        // Guardamos/Actualizamos el estado de esta unidad en Atlas
        await this.unitRepo.save(unit);
        return unit;
    }
    /**
     * Reportar un incidente de transporte (retrasos, fallas, etc).
     * Se aprovecha que TransitCity tiene una estructura similar a City.
     */
    async reportIncident(cityName, message) {
        // Buscamos la ciudad de transporte en el repository
        let transitCityDoc = await this.cityRepo.findByName(cityName);
        if (!transitCityDoc) {
            // Si la ciudad no existe en nuestra DB, la traemos de la API primero
            const cityEntity = await ApiManager_1.ApiManager.getCityRoutes(cityName);
            if (!cityEntity) {
                throw new AppError_1.AppError(`Cannot report incident: City ${cityName} not found`, 404);
            }
            // La guardamos inicialmente y re-obtenemos el documento mongoose
            await this.cityRepo.save(cityEntity);
            transitCityDoc = await this.cityRepo.findByName(cityName);
        }
        const cityRepoGeneral = new CityRepository_1.CityRepository();
        const city = await cityRepoGeneral.findByName(cityName);
        if (city) {
            city.addReport(`[TRANSIT INCIDENT]: ${message}`);
            await cityRepoGeneral.save(city);
        }
    }
};
exports.TransitService = TransitService;
exports.TransitService = TransitService = __decorate([
    SingletonMW_1.Singleton
], TransitService);
