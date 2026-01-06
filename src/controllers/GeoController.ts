import { Request, Response } from "express";
import { GeoService } from "../services/GeoService";
import { Singleton } from "../middlewares/SingletonMW";

@Singleton
export class GeoController {
  private readonly service: GeoService;

  public constructor() {
    this.service = new GeoService();
  }

  /**
   * @swagger
   * /geo/{city}:
   *   get:
   *     summary: Get city data
   *     description: Returns information about a specific city.
   *     parameters:
   *       - in: path
   *         name: city
   *         required: true
   *         schema:
   *           type: string
   *         description: Name of the city
   *     responses:
   *       200:
   *         description: City data retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  public async getCity(req: Request, res: Response): Promise<void> {
    const cityName = req.params.city;
    const cityData = await this.service.getCityData(cityName);
    res.json(cityData);
  }

  /**
   * @swagger
   * /geo/population/{country}:
   *   get:
   *     summary: Get country population
   *     description: Returns population data for a given country.
   *     parameters:
   *       - in: path
   *         name: country
   *         required: true
   *         schema:
   *           type: string
   *         description: Name of the country
   *     responses:
   *       200:
   *         description: Population data retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  public async getPopulation(req: Request, res: Response): Promise<void> {
    const countryName = req.params.country;
    const populationData = await this.service.getCountryPopulation(countryName);
    res.json(populationData);
  }

  /**
   * @swagger
   * /geo/report:
   *   post:
   *     summary: Create a geo report
   *     description: Saves a new geo report into the database.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       201:
   *         description: Report saved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Report saved successfully
   */
  public async createReport(req: Request, res: Response): Promise<void> {
    await this.service.saveReport(req.body);
    res.status(201).json({ message: "Report saved successfully" });
  }
}
