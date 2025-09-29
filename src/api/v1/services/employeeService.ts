export interface Employee {
  id: string;
  name: string;
  position: string;
  branchId: number;
  department: string;
}

let employees: Employee[] = [];

export const getAllEmployees = () => employees;

export const getEmployeeById = (id: string) =>
  employees.find((e) => e.id === id);

export const addEmployee = (data: Omit<Employee, "id">) => {
  const employee: Employee = { id: Date.now().toString(), ...data };
  employees.push(employee);
  return employee;
};

export const updateEmployee = (id: string, data: Partial<Omit<Employee, "id">>) => {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return null;
  employees[index] = { ...employees[index], ...data };
  return employees[index];
};

export const deleteEmployee = (id: string) => {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return false;
  employees.splice(index, 1);
  return true;
};
