"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiManager = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const AppError_1 = require("./AppError");
const City_1 = require("../models/City");
const Country_1 = require("../models/Country");
const TransitCity_1 = require("../models/TransitCity");
const TransitUnit_1 = require("../models/TransitUnit");
class ApiManager {
    /**
     * @swagger
     * components:
     *   schemas:
     *     ApiResponse:
     *       type: object
     *       description: Respuesta genérica de cualquier API externa
     */
    static async get(url, options) {
        const maxRetries = 3;
        let lastError;
        for (let i = 0; i < maxRetries; i++) {
            try {
                const safeOptions = {
                    ...options,
                    body: options?.body ?? undefined,
                };
                const response = await (0, node_fetch_1.default)(url, { method: "GET", ...safeOptions });
                if (!response.ok) {
                    throw new AppError_1.AppError(`API GET error: ${response.statusText}`, response.status);
                }
                return await response.json();
            }
            catch (err) {
                lastError = err;
                if (i < maxRetries - 1) {
                    console.log(`Retrying request to ${url} (${i + 1}/${maxRetries})...`);
                    await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
                    continue;
                }
            }
        }
        throw new AppError_1.AppError(`Failed GET request after ${maxRetries} attempts to ${url}: ${lastError.message}`, 500);
    }
    /**
     * @swagger
     * components:
     *   schemas:
     *     City:
     *       type: object
     *       description: Datos básicos de una ciudad
     *       properties:
     *         name:
     *           type: string
     *         lat:
     *           type: number
     *         lng:
     *           type: number
     *         countryCode:
     *           type: string
     */
    static async getCityData(cityName) {
        const data = await ApiManager.get(`${process.env.GEONAMES_URL}/searchJSON?name=${cityName}&maxRows=1&username=${process.env.GEONAMES_USER}`);
        if (!data.geonames?.length) {
            return null;
        }
        return new City_1.City(cityName, parseFloat(data.geonames[0].lat), parseFloat(data.geonames[0].lng), data.geonames[0].countryCode);
    }
    /**
     * @swagger
     * components:
     *   schemas:
     *     Country:
     *       type: object
     *       description: Datos de población de un país
     *       properties:
     *         countryName:
     *           type: string
     *         countryCode:
     *           type: string
     *         population:
     *           type: number
     *         demographics:
     *           type: object
     */
    static async getCountryData(countryCode) {
        const data = await ApiManager.get(`${process.env.WORLD_BANK_URL}/country/${countryCode}/indicator/SP.POP.TOTL?format=json`);
        if (!data[1]?.length) {
            return null;
        }
        const latest = data[1].find((d) => d.value !== null);
        return new Country_1.Country(latest.country.value, countryCode, latest.value, { year: latest.date });
    }
    /**
     * @swagger
     * components:
     *   schemas:
     *     TransitCity:
     *       type: object
     *       description: Ciudad con sus rutas de transporte público
     *       properties:
     *         name:
     *           type: string
     *         routes:
     *           type: array
     *           items:
     *             $ref: '#/components/schemas/TransitUnit'
     */
    static async getCityRoutes(cityName) {
        if (cityName.toUpperCase() === "NYC") {
            const data = await ApiManager.get(`${process.env.MTA_API_URL}?key=${process.env.MTA_API_KEY}&VehicleMonitoringDetailLevel=calls`);
            const activities = data.Siri?.ServiceDelivery?.VehicleMonitoringDelivery?.VehicleActivity || [];
            const city = new TransitCity_1.TransitCity("NYC");
            activities.forEach((act) => {
                const unit = new TransitUnit_1.TransitUnit(act.MonitoredVehicleJourney.LineRef, act.MonitoredVehicleJourney.FramedVehicleJourneyRef?.DataFrameRef, act.MonitoredVehicleJourney.MonitoredCall?.ExpectedArrivalTime, act.MonitoredVehicleJourney.MonitoredCall?.StopPointRef, act.MonitoredVehicleJourney.MonitoredCall?.StopPointName, act.MonitoredVehicleJourney.VehicleRef, act.MonitoredVehicleJourney.VehicleLocation?.Latitude, act.MonitoredVehicleJourney.VehicleLocation?.Longitude, act.MonitoredVehicleJourney.MonitoredCall?.Extensions?.Distances?.PresentableDistance);
                city.addUnit(unit);
            });
            return city;
        }
        else if (cityName.toUpperCase() === "LONDON") {
            const data = await ApiManager.get(`${process.env.TFL_API_URL}/Line/Mode/bus?app_key=${process.env.TFL_API_KEY}`);
            const city = new TransitCity_1.TransitCity("London");
            data.forEach((line) => {
                const unit = new TransitUnit_1.TransitUnit(line.id, new Date().toISOString().split("T")[0], "", "", line.name, line.id, 0, 0, line.modeName);
                city.addUnit(unit);
            });
            return city;
        }
        return null;
    }
    /**
     * @swagger
     * components:
     *   schemas:
     *     TransitUnit:
     *       type: object
     *       description: Unidad de transporte público con ETA
     *       properties:
     *         line:
     *           type: string
     *         day:
     *           type: string
     *         eta:
     *           type: string
     *         stopId:
     *           type: string
     *         stopName:
     *           type: string
     *         vehicleId:
     *           type: string
     *         location:
     *           type: object
     *           properties:
     *             lat:
     *               type: number
     *             lng:
     *               type: number
     *         distance:
     *           type: string
     */
    static async getETA(stopId) {
        const data = await ApiManager.get(`${process.env.MTA_API_URL}?key=${process.env.MTA_API_KEY}&MonitoringRef=${stopId}`);
        const calls = data.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0]?.MonitoredStopVisit || [];
        if (!calls.length)
            return null;
        const visit = calls[0];
        return new TransitUnit_1.TransitUnit(visit.MonitoredVehicleJourney.LineRef, visit.MonitoredVehicleJourney.FramedVehicleJourneyRef?.DataFrameRef, visit.MonitoredVehicleJourney.MonitoredCall?.ExpectedArrivalTime, visit.MonitoredVehicleJourney.MonitoredCall?.StopPointRef, visit.MonitoredVehicleJourney.MonitoredCall?.StopPointName, visit.MonitoredVehicleJourney.VehicleRef, visit.MonitoredVehicleJourney.VehicleLocation?.Latitude, visit.MonitoredVehicleJourney.VehicleLocation?.Longitude, visit.MonitoredVehicleJourney.MonitoredCall?.Extensions?.Distances?.PresentableDistance);
    }
}
exports.ApiManager = ApiManager;
