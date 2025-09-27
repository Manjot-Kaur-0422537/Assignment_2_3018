import { Request, Response } from "express";
import { getAllBranches, getBranchById, addBranch, updateBranch, deleteBranch } from "../services/branchService";
import { Branch } from "../../../data/branches";

export const createBranch = (req: Request, res: Response): Response => {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const created = addBranch({ name, address, phone });
  return res.status(201).json(created);
};

export const getBranches = (_req: Request, res: Response): Response => {
  return res.status(200).json(getAllBranches());
};

export const getBranch = (req: Request, res: Response): Response => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
  const branch = getBranchById(id);
  if (!branch) return res.status(404).json({ message: "Branch not found" });
  return res.status(200).json(branch);
};

export const updateBranchController = (req: Request, res: Response): Response => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }
  const updated = updateBranch(id, req.body);
  if (!updated) return res.status(404).json({ message: "Branch not found" });
  return res.status(200).json(updated);
};

export const deleteBranchController = (req: Request, res: Response): Response => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
  const success = deleteBranch(id);
  if (!success) return res.status(404).json({ message: "Branch not found" });
  return res.status(200).json({ message: "Branch deleted" });
};
