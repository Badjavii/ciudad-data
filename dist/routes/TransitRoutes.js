"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransitRouter = getTransitRouter;
const express_1 = require("express");
const TransitController_1 = require("../controllers/TransitController");
const ErrorResCatcherMW_1 = require("../middlewares/ErrorResCatcherMW");
function getTransitRouter() {
    const router = (0, express_1.Router)();
    const controller = new TransitController_1.TransitController();
    router.get("/routes/:city", (0, ErrorResCatcherMW_1.withErrorCatcher)(controller.getRoutes.bind(controller)));
    router.get("/eta", (0, ErrorResCatcherMW_1.withErrorCatcher)(controller.getETA.bind(controller)));
    router.post("/incident", (0, ErrorResCatcherMW_1.withErrorCatcher)(controller.reportIncident.bind(controller)));
    return router;
}
