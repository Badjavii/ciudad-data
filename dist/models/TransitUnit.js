"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitUnit = void 0;
class TransitUnit {
    constructor(line, day, eta, stopId, stopName, vehicleId, lat, lng, distance) {
        this.line = line;
        this.day = day;
        this.eta = eta;
        this.stopId = stopId;
        this.stopName = stopName;
        this.vehicleId = vehicleId;
        this.location = { lat, lng };
        this.distance = distance;
    }
}
exports.TransitUnit = TransitUnit;
