/**
 * @file App.ts
 * @description Main application class for CiudadData API.
 * Configures Express, environment variables, database, Swagger, and routes.
 */

import express, { Application } from "express";
import dotenv from "dotenv";
import { initSwagger } from "./config/swagger";
import { initDB } from "./config/database";
import { getGeoRouter } from "./routes/GeoRoutes";
import { getTransitRouter } from "./routes/TransitRoutes";

/**
 * App class encapsulates the Express application setup.
 */
export class App {
  public readonly expressApp: Application;

  /**
   * Constructor initializes configuration, database, Swagger, and routes.
   */
  public constructor() {
    this.expressApp = express();
    this.initConfig();
    this.initDataBase();
    this.initSwagger();
    this.initRoutes();
  }

  private initConfig(): void {
    if (process.env.NODE_ENV === "test") {
      dotenv.config({ path: ".env.test" });
    } else {
      dotenv.config();
    }
    console.log("-> Basic settings: Done");
  }

  public async initDataBase(): Promise<void> {
    await initDB();
    console.log("-> Database: Running");
  }

  private initSwagger(): void {
    initSwagger(this.expressApp);
    console.log("-> Swagger: Running");
  }

  private initRoutes(): void {
    this.expressApp.use("/geo", getGeoRouter());
    this.expressApp.use("/transit", getTransitRouter());
    console.log("-> Routes: Established");
  }

  public listen(): void {
    const port = process.env.PORT || 3000;
    this.expressApp.listen(port, () => {
      console.log(`-> CiudadData API running on port ${port}`);
      console.log("-> To end the API execution, press 'CTRL + C'");
      console.log(
        "-> The documentation is available at http://localhost:3000/api-docs"
      );
    });
  }
}
