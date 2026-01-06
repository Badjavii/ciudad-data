import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });  // subir un nivel desde src/

import { GeoService } from "./services/GeoService";
import { TransitService } from "./services/TransitService";

async function main() {
  const geoService = new GeoService();

  // 1. Prueba 1 de Geo
  const cityData = await geoService.getCityData("Caracas");
  console.log("City data:", cityData);

  // 2. Prueba 2 de Geo
  const populationData = await geoService.getCountryPopulation("VE");
  console.log("Population data:", populationData);

  const transitService = new TransitService();

  // 3. Prueba 1 de Transit
  //const routesData = await transitService.getRoutes("NYC");
  //console.log("Transit routes data:", routesData);

  // 4. Prueba 2 de Transit
  const etaData = await transitService.getETA("553437");
  console.log("ETA data:", etaData);

}

main();
