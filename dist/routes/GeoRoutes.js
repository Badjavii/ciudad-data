"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeoRouter = getGeoRouter;
const express_1 = require("express");
const GeoController_1 = require("../controllers/GeoController");
const ErrorResCatcherMW_1 = require("../middlewares/ErrorResCatcherMW");
function getGeoRouter() {
    const router = (0, express_1.Router)();
    const controller = new GeoController_1.GeoController();
    router.get("/city/:city", (0, ErrorResCatcherMW_1.withErrorCatcher)(controller.getCity.bind(controller)));
    router.get("/population/:country", (0, ErrorResCatcherMW_1.withErrorCatcher)(controller.getPopulation.bind(controller)));
    router.post("/report", (0, ErrorResCatcherMW_1.withErrorCatcher)(controller.createReport.bind(controller)));
    return router;
}
