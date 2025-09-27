import { Router, Request, Response } from "express";
import employeeRoutes from "./employeeRoutes";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.json({ message: "Welcome to API v1" });
});

router.use("/employees", employeeRoutes);

export default router;
