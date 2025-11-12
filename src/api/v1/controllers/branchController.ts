import { Request, Response } from "express";
import { branchService } from "../services/branchService";

// Create Branch
export const createBranch = async (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body;
    if (!name || !address || !phone) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const branch = await branchService.create({ name, address, phone });
    res.status(201).json({ success: true, data: branch });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Failed to create branch" });
  }
};

// Get all Branches
export const getAllBranches = async (_req: Request, res: Response) => {
  try {
    const branches = await branchService.getAll();
    res.status(200).json({ success: true, data: branches });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Failed to fetch branches" });
  }
};

// Get Branch by ID
export const getBranchById = async (req: Request, res: Response) => {
  try {
    const branch = await branchService.getById(req.params.id);
    if (!branch) return res.status(404).json({ success: false, message: "Branch not found" });
    res.status(200).json({ success: true, data: branch });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Failed to get branch" });
  }
};

// Update Branch
export const updateBranch = async (req: Request, res: Response) => {
  try {
    const updatedBranch = await branchService.update(req.params.id, req.body);
    if (!updatedBranch) return res.status(404).json({ success: false, message: "Branch not found" });
    res.status(200).json({ success: true, data: updatedBranch });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Failed to update branch" });
  }
};

// Delete Branch
export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const deleted: boolean = await branchService.delete(req.params.id); 
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }
    res.status(200).json({ success: true, message: "Branch deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Failed to delete branch" });
  }
};
