import { Router } from "express";
import { 
  createEmployee, 
  getAllEmployees, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee,
  getEmployeesByBranch,
  getEmployeesByDepartment
} from "../controllers/employeeController";
import { validate } from "../middleware/validate";
import { employeeSchema } from "../validation/employeeValidation";

const router = Router();

router.post("/", validate(employeeSchema), createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", validate(employeeSchema), updateEmployee);
router.delete("/:id", deleteEmployee);

router.get("/branch/:branchId", getEmployeesByBranch);
router.get("/department/:department", getEmployeesByDepartment);

export default router;
