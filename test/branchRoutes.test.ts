import request from "supertest";
import express from "express";
import branchRoutes from "../src/api/v1/routes/branchRoutes";

const app = express();
app.use(express.json());
app.use("/branches", branchRoutes);

describe("Branch Routes", () => {
  it("POST /branches calls createBranch controller", async () => {
    const res = await request(app).post("/branches").send({
      name: "Winnipeg Branch",
      address: "1 Portage Ave, Winnipeg, MB, R3B 2B9",
      phone: "204-988-2402"
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Winnipeg Branch");
  });

  it("GET /branches calls getAllBranches controller", async () => {
    const res = await request(app).get("/branches");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
