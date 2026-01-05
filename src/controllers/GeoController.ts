import { Request, Response } from "express";
import { GeoService } from "../services/GeoService";
import { Singleton } from "../middlewares/SingletonMW";

@Singleton
export class GeoController {
  private readonly service: GeoService;

  public constructor() {
    this.service = new GeoService();
  }

  public async getCity(req: Request, res: Response): Promise<void> {
      const cityName = req.params.city;
      const cityData = await this.service.getCityData(cityName);
      res.json(cityData);
  }

  public async getPopulation(req: Request, res: Response): Promise<void> {
      const countryName = req.params.country;
      const populationData = await this.service.getCountryPopulation(countryName);
      res.json(populationData);
  }

      public async createReport(req: Request, res: Response): Promise<void> {
      await this.service.saveReport(req.body);
      res.status(201).json({ message: "Report saved successfully" });
  }
}

