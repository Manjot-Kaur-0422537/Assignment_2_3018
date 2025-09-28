import { addEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, Employee } from "../src/api/v1/services/employeeService";

describe("Employee Service", () => {
  let employee: Employee;

  it("should create a new employee", () => {
    employee = addEmployee({
      name: "John Doe", 
      position: "Manager",
      branchId: 1,
      department: "IT" 
    });
    expect(employee.id).toBeDefined();
    expect(employee.name).toBe("John Doe");
  });

  it("should get all employees", () => {
    const employees = getAllEmployees();
    expect(Array.isArray(employees)).toBe(true);
    expect(employees.length).toBeGreaterThan(0);
  });

  it("should get employee by ID", () => {
    const found = getEmployeeById(employee.id);
    expect(found).toBeDefined();
    expect(found?.name).toBe("John Doe");
  });

  it("should update an employee", () => {
    const updated = updateEmployee(employee.id, { position: "Lead" });
    expect(updated?.position).toBe("Lead");
  });

  it("should delete an employee", () => {
    const deleted = deleteEmployee(employee.id);
    expect(deleted).toBe(true);
    expect(getEmployeeById(employee.id)).toBeUndefined();
  });
});

