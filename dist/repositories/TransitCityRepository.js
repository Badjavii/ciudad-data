"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitCityRepository = void 0;
const TransitCitySchema_1 = require("../config/mongoo_schemas/TransitCitySchema");
class TransitCityRepository {
    async findByName(name) {
        return await TransitCitySchema_1.TransitCityModel.findOne({ name: name.toLowerCase() });
    }
    /**
     * Busca una ciudad y "puebla" sus rutas.
     * Esto convierte los IDs en los objetos completos de TransitUnit.
     */
    async findByNameWithRoutes(name) {
        return await TransitCitySchema_1.TransitCityModel.findOne({
            name: name.toLowerCase(),
        }).populate("routes"); // <--- Clave para ver los datos de las unidades
    }
    /**
     * Guarda o actualiza la ciudad.
     * Nota: Aquí 'routes' debe ser un array de IDs (ObjectIds).
     */
    async save(transitCity, unitIds = []) {
        return await TransitCitySchema_1.TransitCityModel.findOneAndUpdate({ name: transitCity.name.toLowerCase() }, {
            name: transitCity.name.toLowerCase(),
            routes: unitIds, // Guardamos los IDs de las TransitUnits
        }, { upsert: true, new: true });
    }
    /**
     * Agrega el ID de una nueva unidad a la ciudad existente.
     */
    async addUnitIdToCity(cityName, unitId) {
        return await TransitCitySchema_1.TransitCityModel.findOneAndUpdate({ name: cityName.toLowerCase() }, { $addToSet: { routes: unitId } }, // $addToSet evita duplicar el mismo ID
        { new: true });
    }
}
exports.TransitCityRepository = TransitCityRepository;
