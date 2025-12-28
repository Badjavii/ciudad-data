import { Router } from "express";
import { GeoController } from "../controllers/GeoController";

export class GeoRoutes {
  private readonly router: Router;
  private readonly controller: GeoController;

  constructor() {
    this.router = Router();
    this.controller = new GeoController();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/city/:city", this.controller.getCity.bind(this.controller));
    this.router.get("/population/:country", this.controller.getPopulation.bind(this.controller));
    this.router.post("/report", this.controller.createReport.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
