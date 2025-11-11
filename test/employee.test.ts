import {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  Employee,
} from "../src/api/v1/services/employeeService";

describe("Employee Service", () => {
  let employee: Employee;

  it("should create a new employee", async () => {
    employee = await addEmployee({
      name: "John Doe",
      position: "Manager",
      branchId: 1,
      department: "IT",
      email: "john@email.com",
    });
    expect(employee.id).toBeDefined();
    expect(employee.name).toBe("John Doe");
  });

  it("should get all employees", async () => {
    const employees = await getAllEmployees();
    expect(Array.isArray(employees)).toBe(true);
    expect(employees.length).toBeGreaterThan(0);
  });

  it("should get employee by ID", async () => {
    const found = await getEmployeeById(employee.id!);
    expect(found).toBeDefined();
    expect(found?.name).toBe("John Doe");
  });

  it("should update an employee", async () => {
    const updated = await updateEmployee(employee.id!, { position: "Lead" });
    expect(updated?.position).toBe("Lead");
  });

  it("should delete an employee", async () => {
    const deleted = await deleteEmployee(employee.id!);
    expect(deleted).toBe(true);
    const result = await getEmployeeById(employee.id!);
    expect(result).toBeNull();
  });
});
