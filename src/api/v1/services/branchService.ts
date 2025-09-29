export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

// Input type for creating a branch 
export interface CreateBranchInput {
  name: string;
  address: string;
  phone: string;
}

// Input type for updating a branch 
export interface UpdateBranchInput {
  name?: string;
  address?: string;
  phone?: string;
}

let branches: Branch[] = [];

export const branchService = {
  create: (data: CreateBranchInput) => {
    const branch: Branch = { id: Date.now().toString(), ...data };
    branches.push(branch);
    return branch;
  },

  getAll: () => branches,

  getById: (id: string) => branches.find(b => b.id === id),

  update: (id: string, data: UpdateBranchInput) => {
    const index = branches.findIndex(b => b.id === id);
    if (index === -1) return null;
    branches[index] = { ...branches[index], ...data };
    return branches[index];
  },

  delete: (id: string) => {
    const index = branches.findIndex(b => b.id === id);
    if (index === -1) return false;
    branches.splice(index, 1);
    return true;
  },
};
