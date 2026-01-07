"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryRepository = void 0;
const CountrySchema_1 = require("../config/mongoo_schemas/CountrySchema");
const Country_1 = require("../models/Country");
class CountryRepository {
    /**
     * Guarda o actualiza un país.
     * Si el countryCode ya existe, actualiza los datos (Upsert).
     */
    async save(country) {
        const data = {
            countryName: country.countryName,
            countryCode: country.countryCode.toUpperCase(),
            population: country.population,
            demographics: country.demographics,
        };
        return await CountrySchema_1.CountryModel.findOneAndUpdate({ countryCode: data.countryCode }, data, { upsert: true, new: true });
    }
    /**
     * Busca un país por su código (ej: "VEN", "COL").
     */
    async findByCode(code) {
        const doc = await CountrySchema_1.CountryModel.findOne({ countryCode: code.toUpperCase() });
        if (!doc)
            return null;
        // Retornamos una instancia de tu clase Country
        return new Country_1.Country(doc.countryName, doc.countryCode, doc.population, doc.demographics);
    }
    /**
     * Obtiene todos los países registrados.
     */
    async getAll() {
        return await CountrySchema_1.CountryModel.find().sort({ countryName: 1 });
    }
}
exports.CountryRepository = CountryRepository;
