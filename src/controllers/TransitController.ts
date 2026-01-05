import { Request, Response } from "express";
import { TransitService } from "../services/TransitService";
import { Singleton } from "../middlewares/SingletonMW";

@Singleton
export class TransitController {
  private readonly service: TransitService;

  public constructor() {
    this.service = new TransitService();
  }

  public async getRoutes(req: Request, res: Response): Promise<void> {
    const cityName = req.params.city;
    const routes = await this.service.getRoutes(cityName);
    res.json(routes);
  }

  public async getETA(req: Request, res: Response): Promise<void> {
    const stopId = req.query.stop_id as string;
    const eta = await this.service.getETA(stopId);
    res.json({ stop_id: stopId, eta });
  }

  public async reportIncident(req: Request, res: Response): Promise<void> {
    await this.service.reportIncident(req.body);
    res.status(201).json({ message: "Incident reported successfully" });
  }
    }

