"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitCity = void 0;
class TransitCity {
    constructor(name) {
        this.name = name;
        this.routes = [];
    }
    addUnit(unit) {
        this.routes.push(unit);
    }
}
exports.TransitCity = TransitCity;
