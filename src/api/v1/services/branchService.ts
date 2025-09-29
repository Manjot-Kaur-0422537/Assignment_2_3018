export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

let branches: Branch[] = [];

export const branchService = {
  create: (data: Omit<Branch, "id">) => {
    const branch: Branch = { id: Date.now().toString(), ...data };
    branches.push(branch);
    return branch;
  },
  getAll: () => branches,
  getById: (id: string) => branches.find(b => b.id === id),
  update: (id: string, data: Partial<Omit<Branch, "id">>) => {
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
