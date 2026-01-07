import { CountryModel, ICountry } from "../config/mongoo_schemas/CountrySchema";
import { Country } from "../models/Country";

export class CountryRepository {
  /**
   * Guarda o actualiza un país.
   * Si el countryCode ya existe, actualiza los datos (Upsert).
   */
  async save(country: Country): Promise<ICountry> {
    const data = {
      countryName: country.countryName,
      countryCode: country.countryCode.toUpperCase(),
      population: country.population,
      demographics: country.demographics,
    };

    return await CountryModel.findOneAndUpdate(
      { countryCode: data.countryCode },
      data,
      { upsert: true, new: true }
    );
  }

  /**
   * Busca un país por su código (ej: "VEN", "COL").
   */
  async findByCode(code: string): Promise<Country | null> {
    const doc = await CountryModel.findOne({ countryCode: code.toUpperCase() });

    if (!doc) return null;

    // Retornamos una instancia de tu clase Country
    return new Country(
      doc.countryName,
      doc.countryCode,
      doc.population,
      doc.demographics
    );
  }

  /**
   * Obtiene todos los países registrados.
   */
  async getAll(): Promise<ICountry[]> {
    return await CountryModel.find().sort({ countryName: 1 });
  }
}
