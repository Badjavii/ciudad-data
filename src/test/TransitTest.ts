import request from "supertest";
import { App } from "../App";
import { pause } from "./setup";

const app = new App().expressApp;

describe("TransitController API", () => {
  it("GET /transit/eta?stop_id=553437 should return next TransitUnit", async () => {
    const res = await request(app).get("/transit/eta").query({ stop_id: "553437" });
    console.log("-> Transit ETA Response:", JSON.stringify(res.body, null, 2));
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("stopId");
    expect(res.body).toHaveProperty("eta");
    expect(typeof res.body.eta).toBe("string");
    expect(res.body).toHaveProperty("line");
    expect(res.body).toHaveProperty("vehicleId");
  });

  it("GET /transit/routes/:city should return TransitCity with routes", async () => {
    const res = await request(app).get("/transit/routes/London");
    console.log("-> Transit Routes Response:", JSON.stringify(res.body, null, 2));
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "london");
    expect(res.body).toHaveProperty("routes");
    expect(Array.isArray(res.body.routes)).toBe(true);
  });

  it("POST /transit/incident should report incident", async () => {
    const res = await request(app)
      .post("/transit/incident")
      .send({ cityName: "london", message: "Bus delay at stop 553437" });
    console.log("-> Transit Incident Response:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Incident reported successfully");
  });

});
