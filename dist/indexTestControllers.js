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
dotenv.config({ path: "../.env" });
const GeoController_1 = require("./controllers/GeoController");
const TransitController_1 = require("./controllers/TransitController");
// Helper para simular req/res
function mockResponse() {
    const res = {};
    res.statusCode = 200;
    res.json = (data) => {
        console.log("Response:", JSON.stringify(data, null, 2));
        return res;
    };
    return res;
}
async function main() {
    const geoController = new GeoController_1.GeoController();
    const transitController = new TransitController_1.TransitController();
    // 1. Prueba de GeoController
    await geoController.getCity({ params: { city: "Caracas" } }, mockResponse());
    await geoController.getPopulation({ params: { country: "VE" } }, mockResponse());
    // 2. Prueba de TransitController
    await transitController.getETA({ query: { stop_id: "553437" } }, mockResponse());
    // más adelante: await transitController.getRoutes({ params: { city: "NYC" } } as any, mockResponse());
}
main();
