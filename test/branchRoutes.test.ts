import request from "supertest";
import app from "../src/app";

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
  createDocument: jest.fn().mockResolvedValue("1"),
  getDocuments: jest.fn().mockResolvedValue({
    docs: [
      {
        id: "1",
        data: () => ({
          id: "1",
          name: "Main Branch",
          address: "123 St",
          phone: "1234567890",
        }),
      },
    ],
  }),
  getDocumentById: jest.fn().mockResolvedValue({
    id: "1",
    data: () => ({
      id: "1",
      name: "Main Branch",
      address: "123 St",
      phone: "1234567890",
    }),
  }),
  updateDocument: jest.fn().mockResolvedValue(undefined),
  deleteDocument: jest.fn().mockResolvedValue(undefined),
}));

describe("Branch Routes", () => {
  it("POST /branches - should create a branch", async () => {
    const res = await request(app)
      .post("/api/v1/branches")
      .send({
        name: "Main Branch",
        address: "123 St",
        phone: "1234567890",
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("name", "Main Branch");
  });

  it("GET /branches - should return all branches", async () => {
    const res = await request(app).get("/api/v1/branches");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).toHaveProperty("name", "Main Branch");
  });

  it("GET /branches/:id - should return a branch by ID", async () => {
    const res = await request(app).get("/api/v1/branches/1");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("name", "Main Branch");
  });

  it("PUT /branches/:id - should update a branch", async () => {
    const res = await request(app)
      .put("/api/v1/branches/1")
      .send({ name: "Updated Branch" });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("name", "Updated Branch");
  });

  it("DELETE /branches/:id - should delete a branch", async () => {
    const res = await request(app).delete("/api/v1/branches/1");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Branch deleted successfully");
  });
});
