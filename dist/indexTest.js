"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: "../.env" }); // subir un nivel desde src/
const GeoService_1 = require("./services/GeoService");
const TransitService_1 = require("./services/TransitService");
async function main() {
    const geoService = new GeoService_1.GeoService();
    // 1. Prueba 1 de Geo
    const cityData = await geoService.getCityData("Caracas");
    console.log("City data:", cityData);
    // 2. Prueba 2 de Geo
    const populationData = await geoService.getCountryPopulation("VE");
    console.log("Population data:", populationData);
    const transitService = new TransitService_1.TransitService();
    // 3. Prueba 1 de Transit
    //const routesData = await transitService.getRoutes("NYC");
    //console.log("Transit routes data:", routesData);
    // 4. Prueba 2 de Transit
    const etaData = await transitService.getETA("553437");
    console.log("ETA data:", etaData);
}
main();
