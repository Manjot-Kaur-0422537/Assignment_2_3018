import { Employee, employees } from "../data/employees";

// Get all employees
export function getAllEmployees(): Employee[] {
  return employees;
}

// Get employee by ID
export function getEmployeeById(id: number): Employee | undefined {
  return employees.find(emp => emp.id === id);
}

// Add new employee
export function addEmployee(newEmployee: Employee): Employee {
  employees.push(newEmployee);
  return newEmployee;
}

// Update employee
export function updateEmployee(id: number, updated: Partial<Employee>): Employee | null {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return null;

  employees[index] = { ...employees[index], ...updated };
  return employees[index];
}

// Delete employee
export function deleteEmployee(id: number): boolean {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return false;

  employees.splice(index, 1);
  return true;
}
