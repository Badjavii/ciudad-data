import { CityModel, ICity } from "../config/mongoo_schemas/CitySchema";
import { City } from "../models/City";

export class CityRepository {
  // Guardar o actualizar una ciudad
  async save(cityEntity: City): Promise<ICity> {
    // Transformamos la instancia de la clase al formato que entiende Mongoose
    const cityData = {
      name: cityEntity.name,
      lat: cityEntity.lat,
      lng: cityEntity.lng,
      countryCode: cityEntity.countryCode,
      reports: cityEntity.reports,
    };

    // Usamos 'upsert' para que si la ciudad ya existe (por nombre), la actualice
    return await CityModel.findOneAndUpdate({ name: cityData.name }, cityData, {
      upsert: true,
      new: true,
    });
  }

  // Obtener una ciudad y convertirla de vuelta a la Clase City (opcional)
  async findByName(name: string): Promise<City | null> {
    const doc = await CityModel.findOne({ name: name.toLowerCase() });
    if (!doc) return null;

    // Rehidratamos la clase con los datos de la DB
    const city = new City(doc.name, doc.lat, doc.lng, doc.countryCode);
    doc.reports.forEach((r) => city.addReport(r.message));
    return city;
  }
}
