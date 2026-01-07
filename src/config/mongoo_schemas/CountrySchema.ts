import mongoose, { Schema, Document } from "mongoose";

export interface ICountry extends Document {
  countryName: string;
  countryCode: string;
  population: number;
  demographics: Record<string, any>;
}

const CountrySchema = new Schema<ICountry>({
  countryName: { type: String, required: true },
  countryCode: { type: String, required: true, unique: true },
  population: { type: Number, required: true },
  demographics: { type: Object, default: {} }
}, {
  timestamps: true 
});

export const CountryModel = mongoose.model<ICountry>("Country", CountrySchema);
