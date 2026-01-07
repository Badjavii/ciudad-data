import { Singleton } from "../middlewares/SingletonMW";
import { CityRepository } from "../repositories/CityRepository";
import { CountryRepository } from "../repositories/CountryRepository";
import { ApiManager } from "../utils/ApiManager";
import { AppError } from "../utils/AppError";
import { City } from "../models/City";
import { Country } from "../models/Country";

@Singleton
export class GeoService {
  private readonly cityRepo: CityRepository;
  private readonly countryRepo: CountryRepository;

  constructor() {
    this.cityRepo = new CityRepository();
    this.countryRepo = new CountryRepository();
  }

  /**
   * Obtiene datos de una ciudad.
   * Primero busca en Atlas (Cache), si no existe, consulta GeoNames.
   */
  public async getCityData(cityName: string): Promise<City> {
    // 1. Intentar buscar en la base de datos local
    let city = await this.cityRepo.findByName(cityName);
    if (city) return city;

    // 2. Si no está, consultar la API externa
    city = await ApiManager.getCityData(cityName);
    if (!city) {
      throw new AppError(`City ${cityName} not found in external API`, 404);
    }

    // 3. Guardar en Atlas para futuras consultas
    await this.cityRepo.save(city);
    return city;
  }

  /**
   * Obtiene datos de un país.
   * Aplica la misma lógica de "Cache-aside" (DB primero, luego API).
   */
  public async getCountryPopulation(countryCode: string): Promise<Country> {
    let country = await this.countryRepo.findByCode(countryCode);
    if (country) return country;

    country = await ApiManager.getCountryData(countryCode);
    if (!country) {
      throw new AppError(`Country ${countryCode} not found`, 404);
    }

    await this.countryRepo.save(country);
    return country;
  }

  /**
   * Guarda un reporte ciudadano.
   */
  public async saveReport(cityName: string, message: string): Promise<City> {
    // Obtenemos la ciudad (de la DB o la API)
    let city = await this.getCityData(cityName);

    // Usamos el método de la clase City para la lógica de negocio
    city.addReport(message);

    // Persistimos el cambio
    await this.cityRepo.save(city);
    return city;
  }
}
