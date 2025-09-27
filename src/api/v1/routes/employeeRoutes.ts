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
  res.status(200).json(getAllEmployees());
});

// GET employee by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const employee = getEmployeeById(id);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.status(200).json(employee);
});

// POST new employee (validate required fields)
router.post("/", (req: Request, res: Response) => {
  const { name, position, department, email, phone, branchId } = req.body;
  if (!name || !position || !department || !email || !phone || !branchId) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const created = addEmployee(req.body);
  res.status(201).json(created);
});

// PUT update employee (must send at least one field)
router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }
  const updated = updateEmployee(id, req.body);
  if (!updated) return res.status(404).json({ message: "Employee not found" });
  res.status(200).json(updated);
});

// DELETE employee (return 200 with message to match your tests)
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const success = deleteEmployee(id);
  if (!success) return res.status(404).json({ message: "Employee not found" });
  res.status(200).json({ message: "Employee deleted" });
});

export default router;
