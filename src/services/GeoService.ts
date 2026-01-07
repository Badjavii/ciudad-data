import { Singleton } from "../middlewares/SingletonMW";
import { GeoRepository } from "../repositories/GeoRepository";
import { ApiManager } from "../utils/ApiManager";
import { AppError } from "../utils/AppError";
import { City } from "../models/City";
import { Country } from "../models/Country";

@Singleton
export class GeoService {
  private readonly repo: GeoRepository;

  constructor() {
    this.repo = new GeoRepository();
  }

  /**`
   * @swagger
   * /geo/city/{city}:
   *   get:
   *     summary: Obtener datos de una ciudad
   *     parameters:
   *       - in: path
   *         name: city
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Datos de la ciudad
   */
  public async getCityData(cityName: string): Promise<City> {
    let city;
    //city = await this.repo.findCity(cityName);
    //if (city) return city;

    city = await ApiManager.getCityData(cityName);
    if (!city) {
      throw new AppError(`City ${cityName} not found`, 404);
    }

    //await this.repo.saveCity(city);
    return city;
  }

  /**
   * @swagger
   * /geo/country/{countryCode}:
   *   get:
   *     summary: Obtener población de un país
   *     parameters:
   *       - in: path
   *         name: countryCode
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Datos de población del país
   */
  public async getCountryPopulation(countryCode: string): Promise<Country> {
    let country;
    // county = await this.repo.findCountry(countryCode);
    //if (country) return country;

    country = await ApiManager.getCountryData(countryCode);
    if (!country) {
      throw new AppError(`Country ${countryCode} not found`, 404);
    }

    // await this.repo.saveCountry(country);
    return country;
  }

  /**
   * @swagger
   * /geo/report:
   *   post:
   *     summary: Guardar un reporte en una ciudad
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
   *       200:
   *         description: Ciudad actualizada con el nuevo reporte
   */
  public async saveReport(cityName: string, message: string): Promise<City> {
    let city = await this.getCityData(cityName);
    city.addReport(message);

    await this.repo.updateCity(city);
    return city;
  }
}
