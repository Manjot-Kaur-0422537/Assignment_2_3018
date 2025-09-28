import { Request, Response } from "express";
import { 
  addEmployee, 
  getAllEmployees as getAllEmployeesService, 
  getEmployeeById as getEmployeeByIdService, 
  updateEmployee as updateEmployeeService, 
  deleteEmployee as deleteEmployeeService 
} from "../services/employeeService";

// Create Employee
export const createEmployee = (req: Request, res: Response) => {
  const { name, position } = req.body;
  if (!name || !position) {
    return res.status(400).json({ message: "Missing parameters" });
  }
  const employee = addEmployee(req.body);
  res.status(201).json(employee);
};

// Get all Employees
export const getAllEmployees = (req: Request, res: Response) => {
  const employees = getAllEmployeesService();
  res.status(200).json(employees);
};

// Get Employee by ID
export const getEmployeeById = (req: Request, res: Response) => {
  const employee = getEmployeeByIdService(req.params.id);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.status(200).json(employee);
};

// Update Employee
export const updateEmployee = (req: Request, res: Response) => {
  const employee = updateEmployeeService(req.params.id, req.body);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.status(200).json(employee);
};

// Delete Employee
export const deleteEmployee = (req: Request, res: Response) => {
  const success = deleteEmployeeService(req.params.id);
  if (!success) return res.status(404).json({ message: "Employee not found" });
  res.status(200).json({ message: "Employee deleted successfully" });
};

// Get all employees by Branch
export const getEmployeesByBranch = (req: Request, res: Response) => { 
  const branchIdNum = Number(req.params.branchId);
  const employees = getAllEmployeesService(); 
  const filtered = employees.filter(emp => emp.branchId === branchIdNum); 

  if (filtered.length === 0) {
    return res.status(404).json({ message: "No employees found for this branch" });
  }
  
  res.status(200).json(filtered); 
};

// Get all employees by Department
export const getEmployeesByDepartment = (req: Request, res: Response) => {
  const { department } = req.params; 
  const employees = getAllEmployeesService();
  const filtered = employees.filter(emp => emp.department === department); 
  if (filtered.length === 0) {
    return res.status(404).json({ message: "No employees found for this department" });
  }
  res.status(200).json(filtered);
};