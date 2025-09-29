import request from "supertest";
import express from "express";
import branchRoutes from "../src/api/v1/routes/branchRoutes";

const app = express();
app.use(express.json());
app.use("/branches", branchRoutes);

describe("Branch Routes", () => {
  it("POST /branches calls createBranch controller", async () => {
    const res = await request(app).post("/branches").send({
      name: "Main Branch",
      address: "123 Street",
      phone: "123-456-7890"
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Main Branch");
  });

  it("GET /branches calls getAllBranches controller", async () => {
    const res = await request(app).get("/branches");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
