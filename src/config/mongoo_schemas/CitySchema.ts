import mongoose, { Schema, Document } from "mongoose";

export interface ICity extends Document {
  name: string;
  lat: number;
  lng: number;
  countryCode: string;
  reports: { message: string; date: Date }[];
}

const CitySchema = new Schema<ICity>({
  name: { type: String, required: true, lowercase: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  countryCode: { type: String, required: true },
  reports: [
    {
      message: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ]
}, {
  timestamps: true
});

export const CityModel = mongoose.model<ICity>("City", CitySchema);
