import { Request, Response } from "express";
import { branchService } from "../services/branchService";

export const createBranch = async (req: Request, res: Response) => {
  try {
    const branch = await branchService.create(req.body);
    res.status(201).json({ success: true, data: branch });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBranches = async (req: Request, res: Response) => {
  try {
    const branches = await branchService.getAll();
    res.status(200).json({ success: true, data: branches });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBranchById = async (req: Request, res: Response) => {
  try {
    const branch = await branchService.getById(req.params.id);
    if (!branch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }
    res.status(200).json({ success: true, data: branch });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBranch = async (req: Request, res: Response) => {
  try {
    const updatedBranch = await branchService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedBranch });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const result = await branchService.delete(req.params.id);
    res.status(200).json({ success: true, message: result.message });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
