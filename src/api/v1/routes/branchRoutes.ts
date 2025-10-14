import { Router } from "express";
import { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } from "../controllers/branchController";
import { validate } from "../middleware/validate";
import { branchSchema } from "../validation/branchValidation";

const router = Router();

router.post("/", validate(branchSchema), createBranch);
router.get("/", getAllBranches);
router.get("/:id", getBranchById);
router.put("/:id", validate(branchSchema), updateBranch);
router.delete("/:id", deleteBranch);

export default router;
