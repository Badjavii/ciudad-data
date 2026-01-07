import {
  TransitUnitModel,
  ITransitUnit,
} from "../config/mongoo_schemas/TransitUnitSchema";
import { TransitUnit } from "../models/TransitUnit";

export class TransitUnitRepository {
  /**
   * Guarda una nueva unidad o actualiza una existente.
   * Usamos 'vehicleId' como clave para no duplicar buses.
   */
  async save(unit: TransitUnit): Promise<ITransitUnit> {
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

    return await TransitUnitModel.findOneAndUpdate(
      { vehicleId: data.vehicleId }, // Buscamos por el ID del vehículo
      data,
      { upsert: true, new: true }
    );
  }

  /**
   * Obtiene todas las unidades que vienen hacia una parada específica.
   */
  async findByStop(stopId: string): Promise<ITransitUnit[]> {
    return await TransitUnitModel.find({ stopId: stopId });
  }

  /**
   * Elimina unidades antiguas (opcional, útil para limpiar datos de tiempo real).
   */
  async deleteOldUnits(line: string): Promise<void> {
    await TransitUnitModel.deleteMany({ line: line });
  }
}
