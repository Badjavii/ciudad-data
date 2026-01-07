import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { Request, Response } from "express";
import { GeoController } from "./controllers/GeoController";
import { TransitController } from "./controllers/TransitController";

// Helper para simular req/res
function mockResponse() {
  const res: Partial<Response> = {};
  res.statusCode = 200;
  res.json = (data: any) => {
    console.log("Response:", JSON.stringify(data, null, 2));
    return res as Response;
  };
  return res as Response;
}

async function main() {
  const geoController = new GeoController();
  const transitController = new TransitController();

  // 1. Prueba de GeoController
  await geoController.getCity({ params: { city: "Caracas" } } as any, mockResponse());
  await geoController.getPopulation({ params: { country: "VE" } } as any, mockResponse());

  // 2. Prueba de TransitController
  await transitController.getETA({ query: { stop_id: "553437" } } as any, mockResponse());
  // más adelante: await transitController.getRoutes({ params: { city: "NYC" } } as any, mockResponse());
}

main();

