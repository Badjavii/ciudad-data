import request from "supertest";
import { App } from "../App";

const app = new App().expressApp;

it("GET /transit/eta?stop_id=553437 should return ETA data", async () => {
  const res = await request(app).get("/transit/eta").query({ stop_id: "553437" });
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
