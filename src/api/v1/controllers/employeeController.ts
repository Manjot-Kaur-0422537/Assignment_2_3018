import { Request, Response } from "express";
import {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

// GET all employees
export function getEmployeesController(_req: Request, res: Response): void {
  const employees = getAllEmployees();
  res.json(employees);
}

// GET employee by ID
export function getEmployeeByIdController(req: Request, res: Response): void {
  const employee = getEmployeeById(Number(req.params.id));
  if (!employee) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }
  res.json(employee);
}

// POST new employee
export function addEmployeeController(req: Request, res: Response): void {
  const newEmployee = req.body;
  if (!newEmployee.name || !newEmployee.role) {
    res.status(400).json({ message: "Name and role are required" });
    return;
  }
  const created = addEmployee(newEmployee);
  res.status(201).json(created);
}

// PUT update employee
export function updateEmployeeController(req: Request, res: Response): void {
  const updated = updateEmployee(Number(req.params.id), req.body);
  if (!updated) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }
  res.json(updated);
}

// DELETE employee
export function deleteEmployeeController(req: Request, res: Response): void {
  const success = deleteEmployee(Number(req.params.id));
  if (!success) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }
  res.status(204).send();
}
