"use strict";
/**
 * @file index.ts
 * @description Entry point of the CiudadData API.
 * Initializes the App class and starts the server.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const app = new App_1.App();
/**
 * Start listening on the configured port.
 * Logs startup information and Swagger docs URL.
 */
app.initDataBase();
app.listen();
console.log("\n\n");
