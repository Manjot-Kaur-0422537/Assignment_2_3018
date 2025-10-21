import { Router } from "express";
import { createBranch, getAllBranches } from "../controllers/branchController";
import { validate } from "../middleware/validate";
import { branchSchema } from "../validation/branchValidation";

const router = Router();

router.post("/", validate(branchSchema), createBranch);
router.get("/", getAllBranches);


export default router;
