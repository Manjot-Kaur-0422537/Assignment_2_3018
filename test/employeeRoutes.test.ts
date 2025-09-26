import request from "supertest";
import app from "../src/app";

describe("Employee API Endpoints", () => {
  // CREATE
  it("should create a new employee", async () => {
    const newEmployee = {
      name: "John Doe",
      position: "Developer",
      department: "IT",
      email: "john@example.com",
      phone: "1234567890",
      branchId: 1,
    };

    const response = await request(app).post("/api/v1/employees").send(newEmployee);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("John Doe");
  });

  it("should fail to create employee with missing parameters", async () => {
    const response = await request(app).post("/api/v1/employees").send({});
    expect(response.status).toBe(400);
  });

  // GET ALL
  it("should return all employees", async () => {
    const response = await request(app).get("/api/v1/employees");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // GET BY ID
  it("should return employee by ID", async () => {
    const response = await request(app).get("/api/v1/employees/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
  });

  it("should return 404 if employee ID not found", async () => {
    const response = await request(app).get("/api/v1/employees/999");
    expect(response.status).toBe(404);
  });

  // UPDATE
  it("should update an employee", async () => {
    const response = await request(app).put("/api/v1/employees/1").send({ phone: "9876543210" });
    expect(response.status).toBe(200);
    expect(response.body.phone).toBe("9876543210");
  });

  it("should fail to update with missing fields", async () => {
    const response = await request(app).put("/api/v1/employees/1").send({});
    expect(response.status).toBe(400);
  });

  // DELETE
  it("should delete an employee", async () => {
    const response = await request(app).delete("/api/v1/employees/1");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Employee deleted");
  });

  it("should return 404 when deleting non-existent employee", async () => {
    const response = await request(app).delete("/api/v1/employees/999");
    expect(response.status).toBe(404);
  });
});
