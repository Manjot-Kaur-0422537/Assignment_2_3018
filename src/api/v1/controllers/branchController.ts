import { Request, Response } from "express";
import { branchService } from "../services/branchService";
import { successResponse, errorResponse } from "../models/responseModel";
import { Branch } from "../models/branchModel";

export const createBranch = (req: Request, res: Response) => {
  try {
    const branch = branchService.create(req.body);
    res.status(201).json(successResponse(branch, "Branch created successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to create branch"));
  }
};

export const getAllBranches = (req: Request, res: Response) => {
  const branches:  Branch[] = branchService.getAll();
  res.status(200).json(successResponse(branches, "Branches retrieved successfully"));
};

export const getBranchById = (req: Request, res: Response) => {
  const branch: Branch | undefined = branchService.getById(req.params.id);
  if (!branch) return res.status(404).json(errorResponse("Branch not found"));
  res.status(200).json(successResponse(branch, "Branch retrieved successfully"));
};

export const updateBranch = (req: Request, res: Response) => {
  const branch: Branch | null = branchService.update(req.params.id, req.body);
  if (!branch) return res.status(404).json(errorResponse("Branch not found"));
  res.status(200).json(successResponse(branch, "Branch updated successfully"));
};

export const deleteBranch = (req: Request, res: Response) => {
  const success = branchService.delete(req.params.id);
  if (!success) return res.status(404).json(errorResponse("Branch not found"));
  res.status(200).json(successResponse(null, "Branch deleted successfully"));
};
