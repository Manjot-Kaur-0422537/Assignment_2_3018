import { Router, Request, Response } from "express";
import employeeRoutes from "./employeeRoutes";
import branchRoutes from "./branchRoutes";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.json({ message: "Welcome to API v1" });
});

router.use("/employees", employeeRoutes);
router.use("/branches", branchRoutes);

export default router;
