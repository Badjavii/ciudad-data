/**
 * @file index.ts
 * @description Entry point of the CiudadData API.
 * Initializes the App class and starts the server.
 */
import dotenv from "dotenv";
import path from "path";

// Esto fuerza a que busque el archivo en la raíz real del proyecto
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { App } from "./App";

const app = new App();

/**
 * Start listening on the configured port.
 * Logs startup information and Swagger docs URL.
 */
app.initDataBase();
app.listen();
console.log("\n\n");
