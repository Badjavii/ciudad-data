import mongoose, { Schema, Document } from "mongoose";
import { ITransitUnit } from "./TransitUnitSchema";

export interface ITransitCity extends Document {
  name: string;
  routes: ITransitUnit[];
}

const TransitCitySchema = new Schema<ITransitCity>({
  name: { type: String, required: true, unique: true },
  routes: [{ type: Schema.Types.ObjectId, ref: "TransitUnit" }]
}, {
  timestamps: true
});

export const TransitCityModel = mongoose.model<ITransitCity>("TransitCity", TransitCitySchema);
