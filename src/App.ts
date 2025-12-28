import express, { Application } from "express";
import dotenv from "dotenv";
import { initSwagger } from "./config/swagger";
import { initDB } from "./config/database";
import { Singleton } from "./middlewares/annotations";
import { GeoRoutes } from "./routes/GeoRoutes";
import { TransitRoutes } from "./routes/TransitRoutes";

@Singleton()
export class App {
    public readonly expressApp: Application;

    private constructor(){
        this.expressApp = express();
        this.initConfig();
        this.initDataBase();
        this.initSwagger();
        this.initRoutes();
    }

    private initConfig(): void {
        dotenv.config();
    }

    private async initDataBase(): Promise<void> {
        await initDB();
    }

    private initSwagger(): void {
        initSwagger(this.expressApp);
    }

    private initRoutes(): void {
        const geoRoutes = new GeoRoutes();
        const transitRoutes = new TransitRoutes();

        this.expressApp.use("/geo", geoRoutes.getRouter());
        this.expressApp.use("/transit", transitRoutes.getRouter());
    }

    public listen(): void {
        const port = process.env.PORT || 3000;
        this.expressApp.listen(port, () => {
            console.log(`CiudadData API running on port ${port}`);
        })
    }

}
