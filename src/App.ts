import express, { Application } from "express";
import dotenv from "dotenv";
import { initSwagger } from "./config/swagger";
import { initDB } from "./config/database";
import { getGeoRouter } from "./routes/GeoRoutes";
import { getTransitRouter } from "./routes/TransitRoutes";

export class App {
    public readonly expressApp: Application;

    public constructor(){
        this.expressApp = express();
        this.initConfig();
        this.initDataBase();
        this.initSwagger();
        this.initRoutes();
    }

    private initConfig(): void {
        dotenv.config();
        console.log("-> Basic settings: Done");
    }

    private async initDataBase(): Promise<void> {
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
            console.log(`CiudadData API running on port ${port}`);
            console.log("To end the API execution, press 'CTRL + C'");
        })
    }

}
