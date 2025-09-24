import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.json({ message: "Welcome to API v1" });
});

export default router;
