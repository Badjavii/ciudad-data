import {
  TransitCityModel,
  ITransitCity,
} from "../config/mongoo_schemas/TransitCitySchema";
import { TransitCity } from "../models/TransitCity";

export class TransitCityRepository {
  async findByName(name: string) {
    return await TransitCityModel.findOne({ name: name.toLowerCase() });
  }

  /**
   * Busca una ciudad y "puebla" sus rutas.
   * Esto convierte los IDs en los objetos completos de TransitUnit.
   */
  async findByNameWithRoutes(name: string): Promise<ITransitCity | null> {
    return await TransitCityModel.findOne({
      name: name.toLowerCase(),
    }).populate("routes"); // <--- Clave para ver los datos de las unidades
  }

  /**
   * Guarda o actualiza la ciudad.
   * Nota: Aquí 'routes' debe ser un array de IDs (ObjectIds).
   */
  async save(
    transitCity: TransitCity,
    unitIds: string[] = []
  ): Promise<ITransitCity> {
    return await TransitCityModel.findOneAndUpdate(
      { name: transitCity.name.toLowerCase() },
      {
        name: transitCity.name.toLowerCase(),
        routes: unitIds, // Guardamos los IDs de las TransitUnits
      },
      { upsert: true, new: true }
    );
  }

  /**
   * Agrega el ID de una nueva unidad a la ciudad existente.
   */
  async addUnitIdToCity(
    cityName: string,
    unitId: string
  ): Promise<ITransitCity | null> {
    return await TransitCityModel.findOneAndUpdate(
      { name: cityName.toLowerCase() },
      { $addToSet: { routes: unitId } }, // $addToSet evita duplicar el mismo ID
      { new: true }
    );
  }
}
