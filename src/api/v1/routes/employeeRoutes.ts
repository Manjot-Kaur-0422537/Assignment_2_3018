import { Router, Request, Response } from "express";
import {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

const router = Router();

// GET all employees
router.get("/", (_req: Request, res: Response) => {
  res.json(getAllEmployees());
});

// GET employee by ID
router.get("/:id", (req: Request, res: Response) => {
  const employee = getEmployeeById(Number(req.params.id));
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
});

// POST new employee
router.post("/", (req: Request, res: Response) => {
  const newEmployee = req.body;
  res.status(201).json(addEmployee(newEmployee));
});

// PUT update employee
router.put("/:id", (req: Request, res: Response) => {
  const updated = updateEmployee(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "Employee not found" });
  res.json(updated);
});

// DELETE employee
router.delete("/:id", (req: Request, res: Response) => {
  const success = deleteEmployee(Number(req.params.id));
  if (!success) return res.status(404).json({ message: "Employee not found" });
  res.status(204).send();
});

export default router;
