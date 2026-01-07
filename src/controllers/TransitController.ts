import { Request, Response } from "express";
import { TransitService } from "../services/TransitService";
import { Singleton } from "../middlewares/SingletonMW";
import { AppError } from "../utils/AppError";

@Singleton
export class TransitController {
  private readonly service: TransitService;

  public constructor() {
    this.service = new TransitService();
  }

  /**
   * @swagger
   * /transit/routes/{city}:
   *   get:
   *     summary: Obtener rutas de transporte público
   *     description: Devuelve todas las rutas de transporte disponibles en una ciudad (NYC o London).
   *     parameters:
   *       - in: path
   *         name: city
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Lista de rutas de la ciudad
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TransitCity'
   */
  public async getRoutes(req: Request, res: Response): Promise<void> {
    try {
      const cityName = req.params.city;
      const city = await this.service.getRoutes(cityName);
      res.json(city);
    } catch (err: any) {
      const status = err instanceof AppError ? err.statusCode : 500;
      res.status(status).json({ error: err.message });
    }
  }

  /**
   * @swagger
   * /transit/eta:
   *   get:
   *     summary: Obtener ETA de una parada
   *     description: Devuelve la próxima unidad de transporte público que llegará a una parada específica.
   *     parameters:
   *       - in: query
   *         name: stop_id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Próxima unidad con ETA
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TransitUnit'
   */
  public async getETA(req: Request, res: Response): Promise<void> {
    try {
      const stopId = req.query.stop_id as string;
      const unit = await this.service.getETA(stopId);
      res.json(unit);
    } catch (err: any) {
      const status = err instanceof AppError ? err.statusCode : 500;
      res.status(status).json({ error: err.message });
    }
  }

  /**
   * @swagger
   * /transit/incident:
   *   post:
   *     summary: Reportar un incidente de transporte
   *     description: Permite a los ciudadanos reportar incidentes de transporte (retrasos, fallas, etc).
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
   *         description: Incidente reportado exitosamente
   */
  public async reportIncident(req: Request, res: Response): Promise<void> {
    try {
      const { cityName, message } = req.body;
      await this.service.reportIncident(cityName, message);
      res.status(201).json({ message: "Incident reported successfully" });
    } catch (err: any) {
      const status = err instanceof AppError ? err.statusCode : 500;
      res.status(status).json({ error: err.message });
    }
  }
}
