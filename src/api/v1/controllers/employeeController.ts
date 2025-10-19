import { Request, Response } from "express";
import { 
  addEmployee, 
  getAllEmployees as getAllEmployeesService, 
  getEmployeeById as getEmployeeByIdService, 
  updateEmployee as updateEmployeeService, 
  deleteEmployee as deleteEmployeeService 
} from "../services/employeeService";
import { successResponse, errorResponse } from "../models/responseModel";
import { Employee } from "../models/employeeModel";

// Create Employee
export const createEmployee = (req: Request, res: Response) => {
  try {
    const { name, position } = req.body;
    if (!name || !position) {
      return res.status(400).json(errorResponse("Missing parameters"));
    }
    const employee = addEmployee(req.body);
    res.status(201).json(successResponse(employee, "Employee created successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to create employee"));
  }
};

// Get all Employees
export const getAllEmployees = (req: Request, res: Response) => {
  const employees: Employee[] = getAllEmployeesService();
  res.status(200).json(successResponse(employees, "Employees retrieved successfully"));
};

// Get Employee by ID
export const getEmployeeById = (req: Request, res: Response) => {
  const employee: Employee | undefined = getEmployeeByIdService(req.params.id);
  if (!employee) return res.status(404).json(errorResponse("Employee not found"));
  res.status(200).json(successResponse(employee, "Employee retrieved successfully"));
};

// Update Employee
export const updateEmployee = (req: Request, res: Response) => {
  const employee: Employee | null = updateEmployeeService(req.params.id, req.body);
  if (!employee) return res.status(404).json(errorResponse("Employee not found"));
  res.status(200).json(successResponse(employee, "Employee updated successfully"));
};

// Delete Employee
export const deleteEmployee = (req: Request, res: Response) => {
  const success = deleteEmployeeService(req.params.id);
  if (!success) return res.status(404).json(errorResponse("Employee not found"));
  res.status(200).json(successResponse(null, "Employee deleted successfully"));
};

// Get all employees by Branch
export const getEmployeesByBranch = (req: Request, res: Response) => { 
  const branchIdNum = Number(req.params.branchId);
  const employees = getAllEmployeesService(); 
  const filtered = employees.filter(emp => emp.branchId === branchIdNum); 

  if (filtered.length === 0) {
    return res.status(404).json(errorResponse("No employees found for this branch"));
  }
  
  res.status(200).json(successResponse(filtered, "Employees retrieved by branch")); 
};

// Get all employees by Department
export const getEmployeesByDepartment = (req: Request, res: Response) => {
  const { department } = req.params; 
  const employees = getAllEmployeesService();
  const filtered = employees.filter(emp => emp.department === department); 
  if (filtered.length === 0) {
    return res.status(404).json(errorResponse("No employees found for this department"));
  }
  res.status(200).json(successResponse(filtered, "Employees retrived by department"));
};