import { Router } from "express";
import {
  createBranch,
  getBranches,
  getBranch,
  updateBranchController,
  deleteBranchController,
} from "../controllers/branchController";

const router = Router();

router.post("/", createBranch);
router.get("/", getBranches);
router.get("/:id", getBranch);
router.put("/:id", updateBranchController);
router.delete("/:id", deleteBranchController);

export default router;
