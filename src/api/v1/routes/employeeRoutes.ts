import { Router, Request, Response } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByBranch,
  getEmployeesByDepartment,
} from "../controllers/employeeController";

const employeeRoutes = Router();

employeeRoutes.post("/", (req: Request, res: Response) => {
  createEmployee(req, res);
});

employeeRoutes.get("/", (req: Request, res: Response) => {
  getAllEmployees(req, res);
});

employeeRoutes.get("/:id", (req: Request, res: Response) => {
  getEmployeeById(req, res);
});

employeeRoutes.put("/:id", (req: Request, res: Response) => {
  updateEmployee(req, res);
});

employeeRoutes.delete("/:id", (req: Request, res: Response) => {
  deleteEmployee(req, res);
});

employeeRoutes.get("/branch/:branchId", (req: Request, res: Response) => {
  getEmployeesByBranch(req, res);
});

employeeRoutes.get("/department/:department", (req: Request, res: Response) => {
  getEmployeesByDepartment(req, res);
});

export default employeeRoutes;
