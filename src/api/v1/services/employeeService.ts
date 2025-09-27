interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: number;
}

let employees: Employee[] = [];
let currentId = 1;

// GET all employees
export function getAllEmployees() {
  return employees;
}

// GET by ID
export function getEmployeeById(id: number) {
  return employees.find(emp => emp.id === id);
}

// ADD new employee
export function addEmployee(data: Omit<Employee, "id">) {
  const newEmployee: Employee = { id: currentId++, ...data };
  employees.push(newEmployee);
  return newEmployee;
}

// UPDATE
export function updateEmployee(id: number, data: Partial<Employee>) {
  const employee = employees.find(emp => emp.id === id);
  if (!employee) return null;
  Object.assign(employee, data);
  return employee;
}

// DELETE
export function deleteEmployee(id: number) {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return false;
  employees.splice(index, 1);
  return true;
}
