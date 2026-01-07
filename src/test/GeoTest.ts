import request from "supertest";
import { App } from "../App";

const app = new App().expressApp;

describe("GeoController API", () => {
  it("GET /geo/city/:city should return city data", async () => {
    const res = await request(app).get("/geo/city/Caracas");
    console.log("-> Geo City Response:", JSON.stringify(res.body, null, 2));
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("lat");
    expect(res.body).toHaveProperty("lng");
    expect(res.body).toHaveProperty("countryCode");
  });

  it("GET /geo/population/:country should return population data", async () => {
    const res = await request(app).get("/geo/population/VE");
    console.log("-> Population Response:", JSON.stringify(res.body, null, 2));
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("population");
    expect(typeof res.body.population).toBe("number");
  });

  it("POST /geo/report should create a report", async () => {
    const res = await request(app)
      .post("/geo/report")
      .send({ cityName: "Caracas", message: "Traffic data" });
    console.log("-> Geo Report Response:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Report saved successfully");
  });
});
