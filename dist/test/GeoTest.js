"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = require("../App");
const app = new App_1.App().expressApp;
describe("GeoController API", () => {
    it("GET /geo/city/:city should return city data", async () => {
        const res = await (0, supertest_1.default)(app).get("/geo/city/Caracas");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("name", "Caracas");
    });
    it("GET /geo/population/:country should return population data", async () => {
        const res = await (0, supertest_1.default)(app).get("/geo/population/VE");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("population");
    });
    it("POST /geo/report should create a report", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/geo/report")
            .send({ city: "Caracas", report: "Traffic data" });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Report saved successfully");
    });
});
