"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
/**
 * @file App.ts
 * @description Main application class for CiudadData API.
 * Configures Express, environment variables, database, Swagger, and routes.
 */
const dnscache = require('dnscache');
dnscache({
    "enable": true,
    "ttl": 300,
    "cachesize": 1000
});
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_1 = require("./config/swagger");
const database_1 = require("./config/database");
const GeoRoutes_1 = require("./routes/GeoRoutes");
const TransitRoutes_1 = require("./routes/TransitRoutes");
/**
 * App class encapsulates the Express application setup.
 */
class App {
    /**
     * Constructor initializes configuration, database, Swagger, and routes.
     */
    constructor() {
        this.expressApp = (0, express_1.default)();
        this.initConfig();
        this.initDataBase();
        this.initSwagger();
        this.initRoutes();
    }
    initConfig() {
        if (process.env.NODE_ENV === "test") {
            dotenv_1.default.config({ path: ".env.test" });
        }
        else {
            dotenv_1.default.config();
        }
        console.log("-> Basic settings: Done");
    }
    async initDataBase() {
        await (0, database_1.initDB)();
        console.log("-> Database: Running");
    }
    initSwagger() {
        (0, swagger_1.initSwagger)(this.expressApp);
        console.log("-> Swagger: Running");
    }
    initRoutes() {
        this.expressApp.use(express_1.default.json());
        this.expressApp.use(express_1.default.urlencoded({ extended: true }));
        this.expressApp.use("/geo", (0, GeoRoutes_1.getGeoRouter)());
        this.expressApp.use("/transit", (0, TransitRoutes_1.getTransitRouter)());
        console.log("-> Routes: Established");
    }
    listen() {
        const port = process.env.PORT || 3000;
        this.expressApp.listen(port, () => {
            console.log(`-> CiudadData API running on port ${port}`);
            console.log("-> To end the API execution, press 'CTRL + C'");
            console.log("-> The documentation is available at http://localhost:3000/api-docs");
        });
    }
}
exports.App = App;
