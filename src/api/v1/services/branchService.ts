import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
} from "../repositories/firestoreRepository";

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

const collectionName = "branches";

export const branchService = {
  async create(data: CreateBranchInput) {
    return await createDocument(collectionName, data);
  },

  async getAll() {
    return await getDocuments;
  },

  async getById(id: string) {
    return await getDocumentById;
  },

  async update(id: string, data: UpdateBranchInput) {
    return await updateDocument(collectionName, id, data);
  },

  async delete(id: string) {
    await deleteDocument(collectionName, id);
    return { message: "Branch deleted successfully" };
  },
};
