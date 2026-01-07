import { Router } from "express";
import { GeoController } from "../controllers/GeoController";
import { withErrorCatcher } from "../middlewares/ErrorResCatcherMW";

export function getGeoRouter(): Router {
  const router = Router();
  const controller = new GeoController();
  
  router.get("/city/:city", withErrorCatcher(controller.getCity.bind(controller)));
  router.get("/population/:country", withErrorCatcher(controller.getPopulation.bind(controller)));
  router.post("/report", withErrorCatcher(controller.createReport.bind(controller)));

  return router;
}
