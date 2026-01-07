import { Singleton } from "../middlewares/SingletonMW";
import { TransitRepository } from "../repositories/TransitRepository";
import { ApiManager } from "../utils/ApiManager";
import { AppError } from "../utils/AppError";
import { TransitCity } from "../models/TransitCity";
import { TransitUnit } from "../models/TransitUnit";

@Singleton
export class TransitService {
  private readonly repo: TransitRepository;

  constructor() {
    this.repo = new TransitRepository();
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
  public async getRoutes(cityName: string): Promise<TransitCity> {
    let city;
    // city = await this.repo.findRoutes(cityName);
    //if (city) return city;

    city = await ApiManager.getCityRoutes(cityName);
    if (!city) {
      throw new AppError(`No routes available for city ${cityName}`, 404);
    }

    // await this.repo.saveRoutes(city);
    return city;
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
  public async getETA(stopId: string): Promise<TransitUnit> {
    let eta;
    // eta = await this.repo.findETA(stopId);
    //if (eta) return eta;

    const unit = await ApiManager.getETA(stopId);
    if (!unit) {
      throw new AppError(`No ETA found for stop ${stopId}`, 404);
    }

    // await this.repo.saveETA(unit);
    return unit;
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
   *               message:
   *                 type: string
   *     responses:
   *       201:
   *         description: Incidente reportado exitosamente
   */
  public async reportIncident(incident: string): Promise<void> {
    // await this.repo.saveIncident(incident);
  }
}
