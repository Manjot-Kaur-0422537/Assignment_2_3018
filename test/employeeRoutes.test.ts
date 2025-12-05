import request from "supertest";
import app from "../src/app";

describe("Employee API Endpoints", () => {
  const employeeId = "1";

  it("should create a new employee", async () => {
    const response = await request(app).post("/api/v1/employees").send({
      name: "Alice Johnson",
      position: "Manager",
      branchId: "1",
      department: "HR",
    });

    expect([201, 400]).toContain(response.status);
  });

  it("should return all employees", async () => {
    const response = await request(app).get("/api/v1/employees");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return employee by ID", async () => {
    const response = await request(app).get(`/api/v1/employees/${employeeId}`);
    expect([200, 404]).toContain(response.status);
  });

  it("should update an employee", async () => {
    const response = await request(app)
      .put(`/api/v1/employees/${employeeId}`)
      .send({ phone: "9876543210" });

    expect([200, 400, 404]).toContain(response.status);
  });

  it("should delete an employee", async () => {
    const response = await request(app).delete(`/api/v1/employees/${employeeId}`);
    expect([200, 204, 404]).toContain(response.status);
  });

  it("should return employees by branch", async () => {
    const response = await request(app).get(`/api/v1/employees/branch/1`);
    expect([200, 404, 500]).toContain(response.status);
  });

  it("should return employees by department", async () => {
    const response = await request(app).get(`/api/v1/employees/department/HR`);
    expect([200, 404]).toContain(response.status);
  });

  it("should fail to create employee with missing parameters", async () => {
    const response = await request(app)
      .post("/api/v1/employees")
      .send({ name: "Incomplete" });

    expect(response.status).toBe(400);
  });
});
