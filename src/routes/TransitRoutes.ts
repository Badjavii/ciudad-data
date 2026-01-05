import { Router } from "express";
import { TransitController } from "../controllers/TransitController";
import { withErrorCatcher } from "../middlewares/ErrorResCatcherMW";

export function getTransitRouter(): Router {
    const router = Router();
    const controller = new TransitController();

    router.get("/routes/:city", withErrorCatcher(controller.getRoutes.bind(controller)));
    router.get("/eta", withErrorCatcher(controller.getETA.bind(controller)));
    router.post("/incident", withErrorCatcher(controller.reportIncident.bind(controller)));

    return router;
}
