import { Branch, branches } from "../../../data/branches";

// Track the next ID (start from 1 or last id + 1 if you already have branches)
let nextId = branches.length > 0 ? branches[branches.length - 1].id + 1 : 1;

// Get all branches
export function getAllBranches(): Branch[] {
  return branches;
}

// Get branch by ID
export function getBranchById(id: number): Branch | undefined {
  return branches.find((b) => b.id === id);
}

// Add new branch — auto-assign id sequentially
export function addBranch(newBranch: Omit<Branch, "id">): Branch {
  const branch: Branch = { id: nextId++, ...newBranch };
  branches.push(branch);
  return branch;
}

// Update branch
export function updateBranch(id: number, updated: Partial<Branch>): Branch | null {
  const idx = branches.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  branches[idx] = { ...branches[idx], ...updated };
  return branches[idx];
}

// Delete branch
export function deleteBranch(id: number): boolean {
  const idx = branches.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  branches.splice(idx, 1);
  return true;
}
