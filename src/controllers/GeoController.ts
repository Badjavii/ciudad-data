import { Request, Response } from "express";
import { GeoService } from "../services/GeoService";
import { Singleton } from "../middlewares/SingletonMW";
import { AppError } from "../utils/AppError";

@Singleton
export class GeoController {
  private readonly service: GeoService;

  public constructor() {
    this.service = new GeoService();
  }

  /**
   * @swagger
   * /geo/city/{city}:
   *   get:
   *     summary: Obtener datos de una ciudad
   *     description: Devuelve información detallada de una ciudad.
   *     parameters:
   *       - in: path
   *         name: city
   *         required: true
   *         schema:
   *           type: string
   *         description: Nombre de la ciudad
   *     responses:
   *       200:
   *         description: Datos de la ciudad obtenidos correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/City'
   */
  public async getCity(req: Request, res: Response): Promise<void> {
    try {
      const cityName = req.params.city;
      const city = await this.service.getCityData(cityName);
      res.json(city);
    } catch (err: any) {
      const status = err instanceof AppError ? err.statusCode : 500;
      res.status(status).json({ error: err.message });
    }
  }

  /**
   * @swagger
   * /geo/country/{countryCode}:
   *   get:
   *     summary: Obtener población de un país
   *     description: Devuelve datos de población para un país específico.
   *     parameters:
   *       - in: path
   *         name: countryCode
   *         required: true
   *         schema:
   *           type: string
   *         description: Código del país (ej: VE)
   *     responses:
   *       200:
   *         description: Datos de población obtenidos correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Country'
   */
  public async getPopulation(req: Request, res: Response): Promise<void> {
    try {
      const countryCode = req.params.country;
      const country = await this.service.getCountryPopulation(countryCode);
      res.json(country);
    } catch (err: any) {
      const status = err instanceof AppError ? err.statusCode : 500;
      res.status(status).json({ error: err.message });
    }
  }

  /**
   * @swagger
   * /geo/report:
   *   post:
   *     summary: Crear un reporte para una ciudad
   *     description: Agrega un nuevo reporte a una ciudad y lo guarda en la base de datos.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               cityName:
   *                 type: string
   *               message:
   *                 type: string
   *     responses:
   *       201:
   *         description: Ciudad actualizada con el nuevo reporte
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/City'
   */
  public async createReport(req: Request, res: Response): Promise<void> {
    try {
      const { cityName, message } = req.body;
      const updatedCity = await this.service.saveReport(cityName, message);
      res.status(201).json(updatedCity);
    } catch (err: any) {
      const status = err instanceof AppError ? err.statusCode : 500;
      res.status(status).json({ error: err.message });
    }
  }
}
