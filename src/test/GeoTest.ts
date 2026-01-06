import request from "supertest";
import { App } from "../App";

const app = new App().expressApp;

describe("GeoController API", () => {
  it("GET /geo/city/:city should return city data", async () => {
    const res = await request(app).get("/geo/city/Caracas");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "Caracas");
  });

  it("GET /geo/population/:country should return population data", async () => {
    const res = await request(app).get("/geo/population/VE");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("population");
  });

  it("POST /geo/report should create a report", async () => {
    const res = await request(app)
      .post("/geo/report")
      .send({ city: "Caracas", report: "Traffic data" });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Report saved successfully");
  });
});
