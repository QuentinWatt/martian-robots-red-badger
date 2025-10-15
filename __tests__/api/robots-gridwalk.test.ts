import { describe, it, expect } from "vitest";
import request from "supertest";

describe("Robots Gridwalk", () => {
  const baseURL = "http://localhost:3000";

  it("An API endpoint exists at /api/robots/gridwalk", async () => {
    const response = await request(baseURL)
      .post("/api/robots/gridwalk")
      .expect("Content-Type", /json/)
      .send({})
      .expect((res) => res.status !== 404);

    expect(response.body).toBeDefined();
  });

  it("Throws an error if gridSize is not provided", async () => {
    const response = await request(baseURL)
      .post("/api/robots/gridwalk")
      .expect("Content-Type", /json/)
      .send({})
      .expect(422);

    expect(response.body).toHaveProperty("errors");
    expect(response.body.message).toContain("Invalid request data.");
    expect(
      response.body.errors.some((error: any) =>
        error.hasOwnProperty("gridSize")
      )
    ).toBe(true);
  });

  it("Throws an error if robots is not provided", async () => {
    const response = await request(baseURL)
      .post("/api/robots/gridwalk")
      .send({ gridSize: "5 3" })
      .expect("Content-Type", /json/)
      .expect(422);

    expect(response.body).toHaveProperty("errors");
    expect(response.body.message).toContain("Invalid request data.");
    expect(
      response.body.errors.some((error: any) => error.hasOwnProperty("robots"))
    ).toBe(true);
  });

  it("Returns a success response if the request is valid", async () => {
    const response = await request(baseURL)
      .post("/api/robots/gridwalk")
      .send({
        gridSize: "5 3",
        robots: [{ startPosition: "1 1 E", moves: "RFRFRFRF" }],
      })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.data).toBeDefined();
  });
});
