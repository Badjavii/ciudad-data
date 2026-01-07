import { Singleton } from "../middlewares/SingletonMW";
import { TransitCityRepository } from "../repositories/TransitCityRepository";
import { TransitUnitRepository } from "../repositories/TransitUnitRepository";
import { ApiManager } from "../utils/ApiManager";
import { AppError } from "../utils/AppError";
import { TransitCity } from "../models/TransitCity";
import { TransitUnit } from "../models/TransitUnit";

@Singleton
export class TransitService {
  private readonly cityRepo: TransitCityRepository;
  private readonly unitRepo: TransitUnitRepository;

  constructor() {
    this.cityRepo = new TransitCityRepository();
    this.unitRepo = new TransitUnitRepository();
  }

  /**
   * Obtiene rutas de transporte.
   * Busca en Atlas (con populate) o consulta API externa si no existe.
   */
  public async getRoutes(cityName: string): Promise<any> {
    // 1. Intentar buscar en DB (incluyendo los datos de las unidades conectadas)
    let cityDoc = await this.cityRepo.findByNameWithRoutes(cityName);
    if (cityDoc) return cityDoc;

    // 2. Si no está, consultar API externa
    const cityEntity = await ApiManager.getCityRoutes(cityName);
    if (!cityEntity) {
      throw new AppError(`No routes available for city ${cityName}`, 404);
    }

    // 3. Persistencia Compleja:
    // Primero guardamos cada TransitUnit y obtenemos sus IDs de MongoDB
    const savedUnitIds: string[] = [];
    for (const unit of cityEntity.routes) {
      const savedUnit = await this.unitRepo.save(unit);
      savedUnitIds.push(savedUnit._id.toString());
    }

    // 4. Guardamos la TransitCity con los IDs de las rutas
    return await this.cityRepo.save(cityEntity, savedUnitIds);
  }

  /**
   * Obtiene el ETA de una parada.
   * Aquí el dato de tiempo real suele venir siempre de la API,
   * pero lo guardamos en DB para historial/caché rápido.
   */
  public async getETA(stopId: string): Promise<TransitUnit> {
    // Consultamos tiempo real
    const unit = await ApiManager.getETA(stopId);
    if (!unit) {
      throw new AppError(`No ETA found for stop ${stopId}`, 404);
    }

    // Guardamos/Actualizamos el estado de esta unidad en Atlas
    await this.unitRepo.save(unit);
    return unit;
  }

  /**
   * Reportar un incidente
   */
  public async reportIncident(
    cityName: string,
    incident: string
  ): Promise<void> {
    console.log(`Reporte para ${cityName}: ${incident}`);
  }
}
