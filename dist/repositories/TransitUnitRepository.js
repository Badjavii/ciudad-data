"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitUnitRepository = void 0;
const TransitUnitSchema_1 = require("../config/mongoo_schemas/TransitUnitSchema");
class TransitUnitRepository {
    /**
     * Guarda una nueva unidad o actualiza una existente.
     * Usamos 'vehicleId' como clave para no duplicar buses.
     */
    async save(unit) {
        const data = {
            line: unit.line,
            day: unit.day,
            eta: unit.eta,
            stopId: unit.stopId,
            stopName: unit.stopName,
            vehicleId: unit.vehicleId,
            location: unit.location,
            distance: unit.distance,
        };
        return await TransitUnitSchema_1.TransitUnitModel.findOneAndUpdate({ vehicleId: data.vehicleId }, // Buscamos por el ID del vehículo
        data, { upsert: true, new: true });
    }
    /**
     * Obtiene todas las unidades que vienen hacia una parada específica.
     */
    async findByStop(stopId) {
        return await TransitUnitSchema_1.TransitUnitModel.find({ stopId: stopId });
    }
    /**
     * Elimina unidades antiguas (opcional, útil para limpiar datos de tiempo real).
     */
    async deleteOldUnits(line) {
        await TransitUnitSchema_1.TransitUnitModel.deleteMany({ line: line });
    }
}
exports.TransitUnitRepository = TransitUnitRepository;
