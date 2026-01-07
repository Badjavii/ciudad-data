import mongoose, { Schema, Document } from "mongoose";

export interface ITransitUnit extends Document {
  line: string;
  day: string;
  eta: string;
  stopId: string;
  stopName: string;
  vehicleId: string;
  location: { lat: number; lng: number };
  distance: string;
}

const TransitUnitSchema = new Schema<ITransitUnit>({
  line: { type: String, required: true },
  day: { type: String, required: true },
  eta: { type: String, required: true },
  stopId: { type: String, required: true },
  stopName: { type: String, required: true },
  vehicleId: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  distance: { type: String, required: true }
}, {
  timestamps: true
});

export const TransitUnitModel = mongoose.model<ITransitUnit>("TransitUnit", TransitUnitSchema);
