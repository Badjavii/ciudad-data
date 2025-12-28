import { Router } from "express";
import { TransitController } from "../controllers/TransitController";

export class TransitRoutes {
  private readonly router: Router;
  private readonly controller: TransitController;

  constructor() {
    this.router = Router();
    this.controller = new TransitController();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/routes/:city", this.controller.getRoutes.bind(this.controller));
    this.router.get("/eta", this.controller.getETA.bind(this.controller));
    this.router.post("/incident", this.controller.reportIncident.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}

