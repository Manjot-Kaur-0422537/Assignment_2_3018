import { Request, Response } from "express";
import { branchService } from "../services/branchService";

export const createBranch = (req: Request, res: Response) => {
  const branch = branchService.create(req.body);
  res.status(201).json(branch);
};

export const getAllBranches = (req: Request, res: Response) => {
  const branches = branchService.getAll();
  res.status(200).json(branches);
};

export const getBranchById = (req: Request, res: Response) => {
  const branch = branchService.getById(req.params.id);
  if (!branch) return res.status(404).json({ message: "Branch not found" });
  res.status(200).json(branch);
};

export const updateBranch = (req: Request, res: Response) => {
  const branch = branchService.update(req.params.id, req.body);
  if (!branch) return res.status(404).json({ message: "Branch not found" });
  res.status(200).json(branch);
};

export const deleteBranch = (req: Request, res: Response) => {
  const success = branchService.delete(req.params.id);
  if (!success) return res.status(404).json({ message: "Branch not found" });
  res.status(200).json({ message: "Branch deleted successfully" });
};
