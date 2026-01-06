"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = require("../App");
const app = new App_1.App().expressApp;
it("GET /transit/eta?stop_id=553437 should return ETA data", async () => {
    const res = await (0, supertest_1.default)(app).get("/transit/eta").query({ stop_id: "553437" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("stopId", "553437");
    expect(res.body).toHaveProperty("eta");
    expect(Array.isArray(res.body.eta)).toBe(true);
});
// it("GET /transit/routes/:city should return routes data", async () => {
//   const res = await request(app).get("/transit/routes/London");
//   expect(res.status).toBe(200);
//   expect(Array.isArray(res.body)).toBe(true);
// });
