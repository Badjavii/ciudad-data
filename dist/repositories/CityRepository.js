"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityRepository = void 0;
const CitySchema_1 = require("../config/mongoo_schemas/CitySchema");
const City_1 = require("../models/City");
class CityRepository {
    // Guardar o actualizar una ciudad
    async save(cityEntity) {
        // Transformamos la instancia de la clase al formato que entiende Mongoose
        const cityData = {
            name: cityEntity.name,
            lat: cityEntity.lat,
            lng: cityEntity.lng,
            countryCode: cityEntity.countryCode,
            reports: cityEntity.reports,
        };
        // Usamos 'upsert' para que si la ciudad ya existe (por nombre), la actualice
        return await CitySchema_1.CityModel.findOneAndUpdate({ name: cityData.name }, cityData, {
            upsert: true,
            new: true,
        });
    }
    // Obtener una ciudad y convertirla de vuelta a la Clase City (opcional)
    async findByName(name) {
        const doc = await CitySchema_1.CityModel.findOne({ name: name.toLowerCase() });
        if (!doc)
            return null;
        // Rehidratamos la clase con los datos de la DB
        const city = new City_1.City(doc.name, doc.lat, doc.lng, doc.countryCode);
        doc.reports.forEach((r) => city.addReport(r.message));
        return city;
    }
}
exports.CityRepository = CityRepository;
