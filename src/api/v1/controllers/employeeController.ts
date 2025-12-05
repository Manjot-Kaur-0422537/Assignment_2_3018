import { Request, Response } from "express";
import {
  addEmployee,
  getAllEmployees as getAllEmployeesService,
  getEmployeeById as getEmployeeByIdService,
  updateEmployee as updateEmployeeService,
  deleteEmployee as deleteEmployeeService,
} from "../services/employeeService";
import { successResponse, errorResponse } from "../models/responseModel";
import { Employee } from "../services/employeeService";

// Create Employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, position, branchId, department, email } = req.body;
    if (!name || !position || !branchId || !department || !email) {
      return res.status(400).json(errorResponse("Missing parameters"));
    }

    const employee: Employee = await addEmployee(req.body);
    res.status(201).json(successResponse(employee, "Employee created successfully"));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message || "Failed to create employee"));
  }
};

// Get all Employees
export const getAllEmployees = async (_req: Request, res: Response) => {
  try {
    const employees: Employee[] = await getAllEmployeesService();
    res.status(200).json(successResponse(employees, "Employees retrieved successfully"));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message || "Failed to fetch employees"));
  }
};

// Get Employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await getEmployeeByIdService(req.params.id);
    if (!employee) return res.status(404).json(errorResponse("Employee not found"));
    res.status(200).json(successResponse(employee, "Employee retrieved successfully"));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message || "Failed to get employee"));
  }
};

// Update Employee
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await updateEmployeeService(req.params.id, req.body);
    if (!employee) return res.status(404).json(errorResponse("Employee not found"));
    res.status(200).json(successResponse(employee, "Employee updated successfully"));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message || "Failed to update employee"));
  }
};

// Delete Employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const success: boolean = await deleteEmployeeService(req.params.id);
    if (!success) return res.status(404).json(errorResponse("Employee not found"));
    res.status(200).json(successResponse(null, "Employee deleted successfully"));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message || "Failed to delete employee"));
  }
};

// Get all employees by Branch
export const getEmployeesByBranch = async (req: Request, res: Response) => {
  try {
    const branchIdParam = req.params.branchId;
    const employees: Employee[] = await getAllEmployeesService();
    const filtered = employees.filter(emp => emp.branchId.toString() === branchIdParam);

    if (filtered.length === 0) {
      return res.status(404).json(errorResponse("No employees found for this branch"));
    }

    res.status(200).json(successResponse(filtered, "Employees retrieved by branch"));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message || "Failed to get employees by branch"));
  }
};

// Get all employees by Department
export const getEmployeesByDepartment = async (req: Request, res: Response) => {
  try {
    const { department } = req.params;
    const employees: Employee[] = await getAllEmployeesService();
    const filtered = employees.filter(emp => emp.department === department);

    if (filtered.length === 0) {
      return res.status(404).json(errorResponse("No employees found for this department"));
    }

    res.status(200).json(successResponse(filtered, "Employees retrieved by department"));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message || "Failed to get employees by department"));
  }
};
