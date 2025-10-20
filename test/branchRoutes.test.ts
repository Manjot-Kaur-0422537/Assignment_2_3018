import request from "supertest";
import express from "express";
import branchRoutes from "../src/api/v1/routes/branchRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1/branches", branchRoutes);

describe("Branch Routes", () => {
  it("POST /branches calls createBranch controller", async () => {
    const res = await request(app)
      .post("/api/v1/branches")
      .send({
        name: "Main Branch",
        location: "Toronto",
        phone: "123-456-7890"
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body.data).toHaveProperty("name", "Main Branch");
  });

  it("GET /branches should return all branches", async () => {
    const res = await request(app).get("/api/v1/branches");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "success");
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
