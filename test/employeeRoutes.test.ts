import request from "supertest";
import app from "../src/app";

describe("Employee API Endpoints", () => {
  let employeeId: string; 

  // CREATE
  beforeAll(async () => {
    const response = await request(app).post("/api/v1/employees").send({
      name: "Lila Spence",
      position: "Loan Coordinator",
      department: "Loans",
      email: "lila.spence@pixell-river.com",
      phone: "204-555-0480",
      branchId: 4,
    });
    employeeId = response.body.id;
  });

  // GET ALL
  it("should return all employees", async () => {
    const response = await request(app).get("/api/v1/employees");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // GET BY ID
  it("should return employee by ID", async () => {
    const response = await request(app).get(`/api/v1/employees/${employeeId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", employeeId);
  });

  // UPDATE
  it("should update an employee", async () => {
    const response = await request(app)
      .put(`/api/v1/employees/${employeeId}`)
      .send({ phone: "9876543210" });
    expect(response.status).toBe(200);
    expect(response.body.phone).toBe("9876543210");
  });

  // DELETE
  it("should delete an employee", async () => {
    const response = await request(app).delete(`/api/v1/employees/${employeeId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Employee deleted successfully");
  });

  // NEGATIVE CASE (missing parameters)
  it("should fail to create employee with missing parameters", async () => {
    const response = await request(app).post("/api/v1/employees").send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing parameters");
  });
});

describe("Employee API Additional Endpoints", () => {
  let branchEmployeeId: string;
  const testBranchId = 4;      
  const testDepartment = "Loans";

  // CREATEdepartment tests
  beforeAll(async () => {
    const response = await request(app).post("/api/v1/employees").send({
      name: "Lila Spence",
      position: "Loan Coordinator",
      department: testDepartment,
      email: "lila.spence@pixell-river.com",
      phone: "204-555-0480",
      branchId: testBranchId,
    });
    branchEmployeeId = response.body.id;
  });

  it("should return all employees for a specific branch", async () => {
    const response = await request(app).get(`/api/v1/employees/branch/${testBranchId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return 404 if branch has no employees", async () => {
    const response = await request(app).get("/api/v1/employees/branch/999");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No employees found for this branch");
  });

  it("should return all employees for a specific department", async () => {
    const response = await request(app).get(`/api/v1/employees/department/${testDepartment}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return 404 if department has no employees", async () => {
    const response = await request(app).get("/api/v1/employees/department/UnknownDept");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No employees found for this department");
  });
});