import { Request, Response } from "express";
import { 
  addEmployee, 
  getAllEmployees as getAllEmployeesService, 
  getEmployeeById as getEmployeeByIdService, 
  updateEmployee as updateEmployeeService, 
  deleteEmployee as deleteEmployeeService 
} from "../services/employeeService";

export const createEmployee = (req: Request, res: Response) => {
  const { name, position } = req.body;
  if (!name || !position) {
    return res.status(400).json({ message: "Missing parameters" });
  }
  const employee = addEmployee(req.body);
  res.status(201).json(employee);
};

export const getAllEmployees = (req: Request, res: Response) => {
  const employees = getAllEmployeesService();
  res.status(200).json(employees);
};

export const getEmployeeById = (req: Request, res: Response) => {
  const employee = getEmployeeByIdService(req.params.id);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.status(200).json(employee);
};

export const updateEmployee = (req: Request, res: Response) => {
  const employee = updateEmployeeService(req.params.id, req.body);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.status(200).json(employee);
};

export const deleteEmployee = (req: Request, res: Response) => {
  const success = deleteEmployeeService(req.params.id);
  if (!success) return res.status(404).json({ message: "Employee not found" });
  res.status(200).json({ message: "Employee deleted successfully" });
};
