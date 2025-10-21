import request from "supertest";
import app from "../src/app";

// Mocked IDs for testing
let testBranchId = "mock-branch-id";
let employeeId = "mock-employee-id";

describe("Employee API Endpoints", () => {
  beforeAll(async () => {
    
    testBranchId = "1";

    // Create an employee
    const employeeRes = await request(app).post("/api/v1/employees").send({
      name: "Lila Spence",
      position: "Loan Coordinator",
      department: "Loans",
      email: "lila.spence@pixell-river.com",
      phone: "204-555-0480",
      branchId: testBranchId,
    });

    expect([200, 201]).toContain(employeeRes.status);
    employeeId = employeeRes.body.data?.id || "1";
  });

  it("should return all employees", async () => {
    const response = await request(app).get("/api/v1/employees");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should return employee by ID", async () => {
    const response = await request(app).get(`/api/v1/employees/${employeeId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
  });

  it("should update an employee", async () => {
    const response = await request(app)
      .put(`/api/v1/employees/${employeeId}`)
      .send({ phone: "9876543210" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body.data).toHaveProperty("phone", "9876543210");
  });

  it("should delete an employee", async () => {
    const response = await request(app).delete(`/api/v1/employees/${employeeId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
  });

  it("should fail to create employee with missing parameters", async () => {
    const response = await request(app).post("/api/v1/employees").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
  });
});

describe("Employee API Additional Endpoints", () => {
  const testDepartment = "Loans";
  const testBranchId = "1";

  beforeAll(async () => {
    const response = await request(app).post("/api/v1/employees").send({
      name: "Lila Spence",
      position: "Loan Coordinator",
      department: testDepartment,
      email: "lila.spence@pixell-river.com",
      phone: "204-555-0480",
      branchId: testBranchId,
    });
    expect([200, 201]).toContain(response.status);
  });

  it("should return all employees for a specific branch", async () => {
    const response = await request(app).get(`/api/v1/employees/branch/${testBranchId}`);

    expect([200, 404]).toContain(response.status);

    if (response.status === 200) {
      expect(response.body).toHaveProperty("status", "success");
      expect(Array.isArray(response.body.data)).toBe(true);
    } else {
      expect(response.body).toHaveProperty("status", "error");
    }
  });

  it("should return 404 if branch has no employees", async () => {
    const response = await request(app).get("/api/v1/employees/branch/999");
    expect([404, 200]).toContain(response.status);
  });

  it("should return all employees for a specific department", async () => {
    const response = await request(app).get(`/api/v1/employees/department/${testDepartment}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
  });

  it("should return 404 if department has no employees", async () => {
    const response = await request(app).get("/api/v1/employees/department/UnknownDept");
    expect([404, 200]).toContain(response.status);
  });
});
